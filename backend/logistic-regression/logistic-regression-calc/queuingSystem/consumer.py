import json

import pandas as pd
import pika
import pymongo

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='main')

client = pymongo.MongoClient(
    "mongodb+srv://Aleksandra:root@math-microservices.mothy.mongodb.net/logistic-regression?retryWrites=true&w=majority")
db = client["logistic-regression"]
csvDB = db['csv-validator']


def callback(ch, method, properties, body):
    print('receive in main')
    # zwalidować to body
    data = json.loads(body)
    df = pd.DataFrame(data)
    print(df)


def started_consuming():
    channel.basic_consume(queue='logistic-regression', on_message_callback=callback, auto_ack=True)
    print('started consuming...')
    channel.start_consuming()
    channel.close()
