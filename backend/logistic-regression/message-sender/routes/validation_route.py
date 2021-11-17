from bson import ObjectId
from flask import Blueprint, request
from flask_cors import cross_origin
from injector import inject

from services.pika_service import PikaService
from services.validation_service import ValidationService

validation_api = Blueprint('validation', __name__)
regression_api = Blueprint('logistic-regression', __name__)


@regression_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def make_regression(service: ValidationService, service_pika: PikaService):
    request_data = request.get_json()
    response = service_pika.publish_regression(request_data, service)
    if response != 'false':
        return {'id_msg': str(response)}, 200
    else:
        return {'message': 'Some RabbitMQ errors occurred'}, 405


@validation_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def make_validation(service: ValidationService, service_pika: PikaService):
    request_data = request.get_json()
    response = service_pika.publish_validation(request_data, service)
    if response != 'false':
        return {'id_msg': str(response)}, 200
    else:
        return {'message': 'Some RabbitMQ errors occurred'}, 405


@validation_api.route('/status/<id>', methods=['GET'])
@inject
@cross_origin("*")
def get_task(id, service: ValidationService):
    task = service.csvDB.find_one({'_id': ObjectId(str(id))})
    task['_id'] = str(task['_id'])
    return task, 200


@regression_api.route("/calc/own", methods=['POST'])
@inject
@cross_origin("*")
def calc_regression(service: ValidationService, service_pika: PikaService):
    request_data = request.get_json()
    headers = request.headers
    response = service_pika.publish_regression_calc(request_data, headers['Model'], service)
    if response != 'false':
        return {'id_msg': str(response)}, 200
    else:
        return {'message': 'Some RabbitMQ errors occurred'}, 405


@regression_api.route("/calc/custom", methods=['POST'])
@inject
@cross_origin("*")
def calc_regression_custom(service: ValidationService, service_pika: PikaService):
    request_data = request.get_json()
    headers = request.headers
    response = service_pika.publish_regression_calc_custom(request_data, headers['Model'], headers['ModelId'], service)
    if response != 'false':
        return {'id_msg': str(response)}, 200
    else:
        return {'message': 'Some RabbitMQ errors occurred'}, 405
