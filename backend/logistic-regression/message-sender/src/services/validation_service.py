import pymongo


class ValidationService:
    def __init__(self):
        self.client = pymongo.MongoClient(
            "mongodb+srv://Aleksandra:root@math-microservices.mothy.mongodb.net/logistic-regression?retryWrites=true&w=majority")
        self.db = self.client['logistic-regression']
        self.csvDB = self.db['csv-validator']
