from flask import Blueprint, request
from flask_cors import cross_origin
from injector import inject

from queuingSystem.publisher import publish_validation, publish_regression, publish_regression_calc, \
    publish_regression_calc_custom
from services.validation_service import ValidationService

validation_api = Blueprint('validation', __name__)
regression_api = Blueprint('logistic-regression', __name__)


@validation_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def make_validation(service: ValidationService):
    request_data = request.get_json()
    id_msg = publish_validation(request_data, service)
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200


@validation_api.route('/status/<id>', methods=['GET'])
@inject
@cross_origin("*")
def get_task(service: ValidationService, id):
    task = service.csvDB.find_one({'_id': int(id)})
    return task, 200


@regression_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def make_regression(service: ValidationService):
    request_data = request.get_json()
    id_msg = publish_regression(request_data, service)
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200


@regression_api.route("/calc/own", methods=['POST'])
@inject
@cross_origin("*")
def calc_regression(service: ValidationService):
    request_data = request.get_json()
    headers = request.headers
    id_msg = publish_regression_calc(request_data, service, headers['Model'])
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200


@regression_api.route("/calc/custom", methods=['POST'])
@inject
@cross_origin("*")
def calc_regression_custom(service: ValidationService):
    request_data = request.get_json()
    headers = request.headers
    temp = ValidationService()
    id_msg = publish_regression_calc_custom(request_data, service, headers['Model'], headers['ModelId'])
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200
