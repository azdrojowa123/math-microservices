import json
import os

import pandas as pd
import pymongo
from bson import ObjectId
from pandas import CategoricalDtype

from queuingSystem.publisher import publish, connection

client = pymongo.MongoClient(
    'mongodb://Aleksandra:{password}@math-microservices-shard-00-00.mothy.mongodb.net:27017,math-microservices-shard-00-01.mothy.mongodb.net:27017,math-microservices-shard-00-02.mothy.mongodb.net:27017/logistic-regression?ssl=true&replicaSet=atlas-1os8hy-shard-0&authSource=admin&retryWrites=true&w=majority'.format(
        password=os.environ.get('DB_PASSWORD')))
db = client["logistic-regression"]
csvDB = db['csv-validator']
conversion_NObeyesdad = {}


def transform_data(body):
    # global conversion_NObeyesdad
    df = pd.DataFrame(body,
                      columns=["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC",
                               "NCP", "CAEC",
                               "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS", "NObeyesdad"])
    gender_type = CategoricalDtype(categories=['Female', 'Male'], ordered=True)
    family_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    FAVC_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    CAEC_type = CategoricalDtype(categories=['no', 'Sometimes', 'Frequently', 'Always'], ordered=True)
    SMOKE_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    SCC_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    CALC_type = CategoricalDtype(categories=['no', 'Sometimes', 'Frequently', 'Always'], ordered=True)
    MTRANS_type = CategoricalDtype(categories=['Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking'],
                                   ordered=True)
    NObeyesdad_type = CategoricalDtype(
        categories=['Insufficient_Weight', 'Normal_Weight', 'Overweight_Level_I', 'Overweight_Level_II',
                    'Obesity_Type_I', 'Obesity_Type_II', 'Obesity_Type_III'], ordered=True)

    df["Gender"] = df["Gender"].astype(gender_type).cat.codes
    df["family_history_with_overweight"] = df["family_history_with_overweight"].astype(family_type).cat.codes
    df["FAVC"] = df["FAVC"].astype(FAVC_type).cat.codes
    df["CAEC"] = df["CAEC"].astype(CAEC_type).cat.codes
    df["SMOKE"] = df["SMOKE"].astype(SMOKE_type).cat.codes
    df["SCC"] = df["SCC"].astype(SCC_type).cat.codes
    df["CALC"] = df["CALC"].astype(CALC_type).cat.codes
    df["MTRANS"] = df["MTRANS"].astype(MTRANS_type).cat.codes
    df["NObeyesdad"] = df["NObeyesdad"].astype(NObeyesdad_type).cat.codes

    conversion_NObeyesdad = dict(enumerate(df["NObeyesdad"].astype(NObeyesdad_type).cat.categories))

    return {'df': df, 'conversion': conversion_NObeyesdad}


def validate(body):
    correct = True
    col_list = ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC",
                "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS", "NObeyesdad"]
    formatted_obj = transform_data(body)
    for col in col_list:
        try:
            formatted_obj['df'][col] = formatted_obj['df'][col].astype(float)
            if (formatted_obj['df'][col] < 0.0).any():
                print("false in " + col)
                correct = False
                break
        except:
            correct = False
            break

    return {'correct': correct, 'conversion': formatted_obj['conversion']}


def callback(ch, method, properties, body):
    # zwalidować to body
    data = json.loads(body)
    validate_obj = validate(data)
    temp = validate_obj['conversion'].items()
    conversion_obj = {str(key): value for key, value in temp}
    if validate_obj['correct']:
        csvDB.update_one({'_id': ObjectId(str(properties.message_id))},
                         {'$set': {'result': 'success', 'stage': 'validation', 'conversionObj': conversion_obj}})
    else:
        csvDB.update_one({'_id': ObjectId(str(properties.message_id))},
                         {'$set': {'result': 'fail', 'stage': 'validation'}})
    if properties.headers['aim'] == 'regression' and validate_obj['correct']:
        publish(transform_data(data)['df'], str(properties.message_id))
    ch.basic_ack(delivery_tag=method.delivery_tag, multiple=False)


def started_consuming():
    # params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb?heartbeat=0')
    channel = connection.channel()
    channel.queue_declare(queue='csv-validate', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='csv-validate', on_message_callback=callback, auto_ack=False)
    channel.start_consuming()
    channel.close()
    connection.close()
