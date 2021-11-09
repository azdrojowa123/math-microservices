import os

import pymongo
from flask import Blueprint, request
from flask_cors import cross_origin
from injector import inject

from queuingSystem.publisher import publish_validation, publish_regression, publish_regression_calc, \
    publish_regression_calc_custom

validation_api = Blueprint('validation', __name__)
regression_api = Blueprint('logistic-regression', __name__)

client = pymongo.MongoClient(
    'mongodb://Aleksandra:{password}@math-microservices-shard-00-00.mothy.mongodb.net:27017,math-microservices-shard-00-01.mothy.mongodb.net:27017,math-microservices-shard-00-02.mothy.mongodb.net:27017/logistic-regression?ssl=true&replicaSet=atlas-1os8hy-shard-0&authSource=admin&retryWrites=true&w=majority'.format(
        password=os.environ.get('DB_PASSWORD')))
db = client['logistic-regression']
csvDB = db['csv-validator']


@validation_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def make_validation():
    request_data = request.get_json()
    id_msg = publish_validation(request_data)
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200


@validation_api.route('/status/<id>', methods=['GET'])
@inject
@cross_origin("*")
def get_task(id):
    task = csvDB.find_one({'_id': int(id)})
    return task, 200


@regression_api.route("", methods=['POST'])
@inject
@cross_origin("*")
def make_regression():
    request_data = request.get_json()
    id_msg = publish_regression(request_data)
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200


@regression_api.route("/calc/own", methods=['POST'])
@inject
@cross_origin("*")
def calc_regression():
    request_data = request.get_json()
    headers = request.headers
    id_msg = publish_regression_calc(request_data, headers['Model'])
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200


@regression_api.route("/calc/custom", methods=['POST'])
@inject
@cross_origin("*")
def calc_regression_custom():
    request_data = request.get_json()
    headers = request.headers
    id_msg = publish_regression_calc_custom(request_data, headers['Model'], headers['ModelId'])
    # zwrócić odpowiedź z poprawnym ID
    return {'id_msg': id_msg}, 200
