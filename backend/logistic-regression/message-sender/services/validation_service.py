import os

import pymongo


class ValidationService:
    def __init__(self):
        self.client = pymongo.MongoClient(
            'MONGO_URL'.format(
                password=os.environ.get('DB_PASSWORD')))
        self.db = self.client['logistic-regression']
        self.csvDB = self.db['csv-validator']

