import pika

params = pika.URLParameters('PIKA')
connection = pika.BlockingConnection(params)
channel = connection.channel()

def publish(body, msg_id):
    properties = pika.BasicProperties(message_id=str(msg_id))
    channel.queue_declare(queue='logistic-regression', durable=True)
    channel.basic_publish(exchange='', routing_key='logistic-regression', body=body.to_json(),
                          properties=properties)
