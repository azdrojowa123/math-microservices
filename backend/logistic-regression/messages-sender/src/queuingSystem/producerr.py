# amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb

import json

import pika
import pymongo

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)

channel = connection.channel()
channel.queue_declare(queue="csv-validate")

client = pymongo.MongoClient(
    "mongodb+srv://Aleksandra:root@math-microservices.mothy.mongodb.net/logistic-regression?retryWrites=true&w=majority")
db = client["logistic-regression"]
csvDB = db['csv-validator']


def publish(body):
    id_msg = csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    print(body)
    channel.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body), properties=properties)
    csvDB.insert_one({'_id': id_msg, 'aim': 'validation', 'result': 'process'})
    # zwracamy na front ID zlecenia
    return id_msg
