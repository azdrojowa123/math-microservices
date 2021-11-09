import pika

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)

channel_validate = connection.channel()
channel_validate.queue_declare(queue='logistic-regression')


def publish(body, msg_id):
    properties = pika.BasicProperties(message_id=str(msg_id))
    channel_validate.basic_publish(exchange='', routing_key='logistic-regression', body=body.to_json(),
                                   properties=properties)
