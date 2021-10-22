from flask import Blueprint, request
from injector import inject

from queuingSystem.producerr import publish
from services.validation_service import ValidationService

validation_api = Blueprint('validation', __name__)


@validation_api.route("", methods=['POST'])
@inject
def welcome(service: ValidationService):
    print(service.create_user("ol"))
    request_data = request.get_json()
    publish(request_data)
    # zapisać do bazy danych przez serwis

    # zwrócić odpowiedź z poprawnym ID
    return "welcome", 200
