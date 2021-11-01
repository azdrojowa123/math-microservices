import pymongo


class ValidationService:
    def __init__(self):
        self.client = pymongo.MongoClient(
            "mongodb://Aleksandra:root@math-microservices-shard-00-00.mothy.mongodb.net:27017,math-microservices-shard-00-01.mothy.mongodb.net:27017,math-microservices-shard-00-02.mothy.mongodb.net:27017/logistic-regression?ssl=true&replicaSet=atlas-1os8hy-shard-0&authSource=admin&retryWrites=true&w=majority")
        self.db = self.client['logistic-regression']
        self.csvDB = self.db['csv-validator']
