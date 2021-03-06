import json

import pika
from bson import ObjectId


class PikaService:

    def publish_validation(self, body, service):
        created_id = ObjectId()
        properties = pika.BasicProperties(message_id=str(created_id), headers={'aim': 'validation'})
        try:
            inserted_obj = service.csvDB.insert_one({'_id': created_id, 'aim': 'validation', 'result': 'process'})
            conn = pika.BlockingConnection(pika.URLParameters(
                'PIKA_URL'))
            channel = conn.channel()
            channel.queue_declare(queue='csv-validate', durable=True)
            channel.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body),
                                  properties=properties)
            channel.close()
            conn.close()
            return inserted_obj.inserted_id
        except:
            service.csvDB.delete_one({'_id': created_id})
            return 'false'

    def publish_regression(self, body, service):
        created_id = ObjectId()
        conn = None
        properties = pika.BasicProperties(message_id=str(created_id), headers={'aim': 'regression'}, delivery_mode=2)
        try:
            inserted_obj = service.csvDB.insert_one({'_id': created_id, 'aim': 'regression', 'result': 'process'})
            params = pika.URLParameters(
                'PIKA_URL')
            conn = pika.BlockingConnection(params)
            channel = conn.channel()
            channel.queue_declare(queue='csv-validate', durable=True)
            channel.basic_publish(exchange='', routing_key='csv-validate', body=json.dumps(body),
                                  properties=properties)
            channel.close()
            conn.close()
            return inserted_obj.inserted_id
        except:
            if conn and conn.is_open:
                conn.close()
            service.csvDB.delete_one({'_id': created_id})
            return 'false'

    def publish_regression_calc(self, body, model, service):
        created_id = ObjectId()
        properties = pika.BasicProperties(message_id=str(created_id), headers={'model': model})
        try:
            inserted_obj = service.csvDB.insert_one({'_id': created_id, 'aim': 'calc', 'result': 'process'})
            conn = pika.BlockingConnection(pika.URLParameters(
                'PIKA_URL'))
            channel = conn.channel()
            channel.queue_declare(queue='logistic-regression-calc', durable=True)
            channel.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                  properties=properties)
            channel.close()
            conn.close()
            return inserted_obj.inserted_id
        except:
            service.csvDB.delete_one({'_id': created_id})
            return 'false'

    def publish_regression_calc_custom(self, body, model, modelId, service):
        created_id = ObjectId()
        properties = pika.BasicProperties(message_id=str(created_id), headers={'model': model, 'modelId': modelId})
        try:
            inserted_obj = service.csvDB.insert_one({'_id': created_id, 'aim': 'calc', 'result': 'process'})
            conn = pika.BlockingConnection(pika.URLParameters(
                'PIKA_URL'))
            channel = conn.channel()
            channel.queue_declare(queue='logistic-regression-calc', durable=True)
            channel.basic_publish(exchange='', routing_key='logistic-regression-calc', body=json.dumps(body),
                                  properties=properties)
            channel.close()
            conn.close()
            return inserted_obj.inserted_id
        except:
            service.csvDB.delete_one({'_id': created_id})
            return 'false'
