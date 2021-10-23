# amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb

import json

import pika
from services.validation_service import ValidationService

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)

channel = connection.channel()
channel.queue_declare(queue="csv-validate")


def publish(body, service: ValidationService):
    id_msg = service.csvDB.find().count() + 1
    properties = pika.BasicProperties(message_id=str(id_msg))
    print(body)
    service.csvDB.insert_one({'_id': id_msg, 'aim': 'validation', 'result': 'process'})
    channel.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body), properties=properties)
    # zwracamy na front ID zlecenia
    return id_msg
