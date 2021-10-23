# amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb

import json

import pandas as pd
import pika
import pymongo
from pandas import CategoricalDtype

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='main')

client = pymongo.MongoClient(
    "mongodb+srv://Aleksandra:root@math-microservices.mothy.mongodb.net/logistic-regression?retryWrites=true&w=majority")
db = client["logistic-regression"]
csvDB = db['csv-validator']


def validate(body):
    df = pd.DataFrame(body)
    correct = True
    col_list = ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC",
                "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS", "NObeyesdad"]
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

    print(df)
    for col in col_list:
        if df[col].any() < 0:
            correct = False

    return correct


def callback(ch, method, properties, body):
    print('receive in main')
    # zwalidować to body
    data = json.loads(body)
    correct = validate(data)
    # sprawdzić jaki ma cel i zmienić w bazie danych
    task = csvDB.find_one({'_id': int(properties.message_id)})
    if task['aim'] == 'validation':
        if correct:
            csvDB.update_one({'_id': int(properties.message_id)}, {'$set': {'result': 'success'}})
        else:
            csvDB.update_one({'_id': int(properties.message_id)}, {'$set': {'result': 'fail'}})


def started_consuming():
    channel.basic_consume(queue='csv-validate', on_message_callback=callback, auto_ack=True)
    print('started consuming...')
    channel.start_consuming()
    channel.close()
