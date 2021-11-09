# amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb

import json
import os

import pika
import pymongo

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)

channel_validate = connection.channel()
channel_validate.queue_declare(queue='csv-validate')
channel_calculation = connection.channel()
channel_calculation.queue_declare(queue='logistic-regression-calc')

client = pymongo.MongoClient(
    'mongodb://Aleksandra:{password}@math-microservices-shard-00-00.mothy.mongodb.net:27017,math-microservices-shard-00-01.mothy.mongodb.net:27017,math-microservices-shard-00-02.mothy.mongodb.net:27017/logistic-regression?ssl=true&replicaSet=atlas-1os8hy-shard-0&authSource=admin&retryWrites=true&w=majority'.format(
        password=os.environ.get('DB_PASSWORD')))
db = client['logistic-regression']
csvDB = db['csv-validator']


def check_connection(channel_name):
    global connection, channel_validate, channel_calculation, params
    if connection.is_closed or not connection:
        print('connection closed')
        connection = pika.BlockingConnection(params)
        if channel_name == 'csv-validate':
            print('new validation')
            channel_validate = connection.channel()
            channel_validate.queue_declare(queue='csv-validate')
        else:
            channel_calculation = connection.channel()
            channel_calculation.queue_declare(queue='logistic-regression-calc')


def publish_validation(body):
    print('przed')
    id_msg = csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    csvDB.insert_one({'_id': id_msg, 'aim': 'validation', 'result': 'process'})
    check_connection('csv-validate')
    print('po check')
    channel_validate.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body),
                                   properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression(body):
    id_msg = csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    csvDB.insert_one({'_id': id_msg, 'aim': 'regression', 'result': 'process'})
    check_connection('csv-validate')
    channel_validate.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body),
                                   properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression_calc(body, model):
    id_msg = csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg), headers={'model': model})
    csvDB.insert_one({'_id': id_msg, 'aim': 'calc', 'result': 'process'})
    check_connection('logistic-regression-calc')
    channel_calculation.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                      properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression_calc_custom(body, model, modelId):
    id_msg = csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg), headers={'model': model, 'modelId': modelId})
    csvDB.insert_one({'_id': id_msg, 'aim': 'calc', 'result': 'process'})
    check_connection('logistic-regression-calc')
    channel_calculation.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                      properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg
