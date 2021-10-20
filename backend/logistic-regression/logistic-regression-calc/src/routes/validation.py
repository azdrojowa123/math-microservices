from http import HTTPStatus
from flask import Blueprint, request
from injector import inject
from services.validation_service import ValidationService

validation_api = Blueprint('validation', __name__)

@validation_api.route("", methods=['POST'])
@inject
def welcome(service: ValidationService):
    str="olcia"
    print(service.create_user("ol"))
    request_data = request.get_json()
    language = request_data['language']
    print(language)
    return "welcome", 200