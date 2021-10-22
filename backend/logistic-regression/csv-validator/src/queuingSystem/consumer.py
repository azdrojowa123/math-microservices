# amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb

import json

import pika

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='main')


def callback(body):
    print('receive in main')
    data = json.loads(body)
    print(data)


def started_consuming():
    channel.basic_consume(queue='csv-validate', on_message_callback=callback, auto_ack=True)
    print('started consuming...')
    channel.start_consuming()
    channel.close()
