

import json
import sys

import pika

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)

channel_validate = connection.channel()
channel_validate.queue_declare(queue='csv-validate')
channel_calculation = connection.channel()
channel_calculation.queue_declare(queue='logistic-regression-calc')
channel_validate.basic_qos(0)
channel_calculation.basic_qos(0)


def check_connection_validate():
    global connection, channel_validate, params
    if connection.is_closed or not connection:
        print('conn valid closed', flush=True)
        connection = pika.BlockingConnection(params)
        channel_validate = connection.channel()
        channel_validate.basic_qos(0)
        channel_validate.queue_declare(queue='csv-validate')
    elif channel_validate.is_closed:
        print('channel valid closed', flush=True)
        channel_validate = connection.channel()
        channel_validate.basic_qos(0)
        channel_validate.queue_declare(queue='csv-validate')


def check_connection_calc():
    global connection, channel_calculation, params
    if connection.is_closed or not connection:
        print('conn closed', flush=True)
        connection = pika.BlockingConnection(params)
        channel_calculation = connection.channel()
        channel_calculation.basic_qos(0)
        channel_calculation.queue_declare(queue='logistic-regression-calc')
    elif channel_calculation.is_closed:
        print('channel closed', flush=True)
        channel_calculation = connection.channel()
        channel_calculation.basic_qos(0)
        channel_calculation.queue_declare(queue='logistic-regression-calc')


def publish_validation(body, service):
    print('przed', flush=True)
    print('This is error output', file=sys.stderr)
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'validation', 'result': 'process'})
    check_connection_validate()
    print('po check', flush=True)
    channel_validate.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body),
                                   properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression(body, service):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'regression', 'result': 'process'})
    check_connection_validate()
    channel_validate.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body),
                                   properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression_calc(body, model, service):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg), headers={'model': model})
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'calc', 'result': 'process'})
    check_connection_calc()
    channel_calculation.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                      properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg


def publish_regression_calc_custom(body, model, modelId, service):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg), headers={'model': model, 'modelId': modelId})
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'calc', 'result': 'process'})
    check_connection_calc()
    channel_calculation.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                      properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg
