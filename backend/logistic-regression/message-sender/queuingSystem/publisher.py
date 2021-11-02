# amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb

import json

import pika

from services.validation_service import ValidationService

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)

channel = connection.channel()
channel.queue_declare(queue='csv-validate')
channel_calculation = connection.channel()
channel_calculation.queue_declare(queue='logistic-regression-calc')


def publish_validation(body, service: ValidationService):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'validation', 'result': 'process'})
    channel.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body), properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression(body, service: ValidationService):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'regression', 'result': 'process'})
    channel.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body), properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression_calc(body, service: ValidationService, model):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg), headers={'model': model})
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'calc', 'result': 'process'})
    channel_calculation.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                      properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression_calc_custom(body, service: ValidationService, model, modelId):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg), headers={'model': model, 'modelId': modelId})
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'calc', 'result': 'process'})
    channel_calculation.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                      properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg
