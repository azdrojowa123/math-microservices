from flask import Blueprint, request
from flask_cors import cross_origin
from injector import inject

from queuingSystem.producerr import publish
from services.validation_service import ValidationService

validation_api = Blueprint('validation', __name__)


@validation_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def welcome(service: ValidationService):
    request_data = request.get_json()
    id_msg = publish(request_data)
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200
