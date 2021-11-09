import json
import os

import pandas as pd
import pika
import pymongo
from pandas import CategoricalDtype
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

params = pika.URLParameters('amqps://rxbzokdb:elwZVQHjIJpiaJa89zarp4g7zpE89gXS@beaver.rmq.cloudamqp.com/rxbzokdb')
connection = pika.BlockingConnection(params)
channel_fit = connection.channel()
channel_calc = connection.channel()
channel_fit.queue_declare(queue='logistic-regression')
channel_calc.queue_declare(queue='logistic-regression-calc')


client = pymongo.MongoClient(
    'mongodb://Aleksandra:{password}@math-microservices-shard-00-00.mothy.mongodb.net:27017,math-microservices-shard-00-01.mothy.mongodb.net:27017,math-microservices-shard-00-02.mothy.mongodb.net:27017/logistic-regression?ssl=true&replicaSet=atlas-1os8hy-shard-0&authSource=admin&retryWrites=true&w=majority'.format(
        password=os.environ.get('DB_PASSWORD')))
db = client["logistic-regression"]
csvDB = db['csv-validator']
LogReg_custom = LogisticRegression(max_iter=10000, solver='saga')
LogReg_own = LogisticRegression(max_iter=10000, solver='saga')


# onversion_NObeyesdad = {}


def fit_regression(df, id):
    X = df[
        ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC", "SMOKE",
         "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS"]]
    Y = df[['NObeyesdad']]
    number_of_rows = len(df.index)
    train_samples = 0
    if number_of_rows < 50:
        train_samples = 5
    elif number_of_rows < 100:
        train_samples = 10
    else:
        train_samples = 15
    X_train, X_test, y_train, y_test = train_test_split(X, Y.values.ravel(), test_size=train_samples)
    print('test size' + str(len(X_test.index)))
    LogReg_custom.fit(X_train, y_train)
    y_pred = LogReg_custom.predict(X_test)
    accuracy = round(LogReg_custom.score(X_test, y_test), 2)
    print(y_pred)
    print(y_test)
    print(accuracy)
    csvDB.update_one({'_id': id}, {'$set': {'result': 'success', 'stage': 'regression', 'accuracy': accuracy}})


def calculate_own():
    #global conversion_NObeyesdad
    col_list = ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC",
                "SMOKE", "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS", "NObeyesdad"]
    df = pd.read_csv('static/obesity.csv', usecols=col_list, index_col=False)
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

    X = df[
        ["Gender", "Age", "Height", "Weight", "family_history_with_overweight", "FAVC", "FCVC", "NCP", "CAEC", "SMOKE",
         "CH2O", "SCC", "FAF", "TUE", "CALC", "MTRANS"]]
    Y = df[['NObeyesdad']]
    X_train, X_test, y_train, y_test = train_test_split(X, Y.values.ravel(), test_size=0.01)
    LogReg_own.fit(X_train, y_train)
    return dict(enumerate(df["NObeyesdad"].astype(NObeyesdad_type).cat.categories))


def calc_regression(ch, method, properties, body):
    data = json.loads(body)
    df = pd.DataFrame.from_dict([data], orient='columns')
    print(df)
    gender_type = CategoricalDtype(categories=['Female', 'Male'], ordered=True)
    family_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    FAVC_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    CAEC_type = CategoricalDtype(categories=['no', 'Sometimes', 'Frequently', 'Always'], ordered=True)
    SMOKE_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    SCC_type = CategoricalDtype(categories=['yes', 'no'], ordered=True)
    CALC_type = CategoricalDtype(categories=['no', 'Sometimes', 'Frequently', 'Always'], ordered=True)
    MTRANS_type = CategoricalDtype(categories=['Automobile', 'Motorbike', 'Bike', 'Public_Transportation', 'Walking'],
                                   ordered=True)
    df["Gender"] = df["Gender"].astype(gender_type).cat.codes
    df["family_history_with_overweight"] = df["family_history_with_overweight"].astype(family_type).cat.codes
    df["FAVC"] = df["FAVC"].astype(FAVC_type).cat.codes
    df["CAEC"] = df["CAEC"].astype(CAEC_type).cat.codes
    df["SMOKE"] = df["SMOKE"].astype(SMOKE_type).cat.codes
    df["SCC"] = df["SCC"].astype(SCC_type).cat.codes
    df["CALC"] = df["CALC"].astype(CALC_type).cat.codes
    df["MTRANS"] = df["MTRANS"].astype(MTRANS_type).cat.codes
    if properties.headers['model'] == 'own':
        conversion_NObeyesdad = calculate_own()
        try:
            y_pred = LogReg_own.predict(df)
            print("PREDYKCJA " + str(y_pred))
            print("PO ZAMIANIE " + conversion_NObeyesdad[y_pred[0]])
            csvDB.update_one({'_id': int(properties.message_id)}, {
                '$set': {'result': 'success', 'stage': 'calc', 'estimation': conversion_NObeyesdad[y_pred[0]]}})
        except:
            csvDB.update_one({'_id': int(properties.message_id)}, {'$set': {'result': 'fail', 'stage': 'calc'}})
    else:
        conversion_NObeyesdad = csvDB.find_one({'_id': int(properties.headers['modelId'])})['conversionObj']
        try:
            y_pred = LogReg_custom.predict(df)
            csvDB.update_one({'_id': int(properties.message_id)}, {
                '$set': {'result': 'success', 'stage': 'calc',
                         'estimation': str(conversion_NObeyesdad[str(y_pred[0])])}})
        except:
            csvDB.update_one({'_id': int(properties.message_id)}, {'$set': {'result': 'fail', 'stage': 'calc'}})


def callback_fit(ch, method, properties, body):
    print('receive in main')
    msg_id = int(properties.message_id)
    data = json.loads(body)
    df = pd.DataFrame(data)
    fit_regression(df, msg_id)


def started_consuming():
    channel_fit.basic_consume(queue='logistic-regression', on_message_callback=callback_fit, auto_ack=True)
    channel_calc.basic_consume(queue='logistic-regression-calc', on_message_callback=calc_regression, auto_ack=True)
    print('started consuming...')
    channel_fit.start_consuming()
    channel_calc.start_consuming()
    channel_fit.close()
    channel_calc.close()
