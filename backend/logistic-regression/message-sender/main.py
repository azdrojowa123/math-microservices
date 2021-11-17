from flask import Flask
from flask_injector import FlaskInjector, singleton

from routes.validation_route import validation_api, regression_api
from services.pika_service import PikaService
from services.validation_service import ValidationService


def configure_di(binder):
    binder.bind(ValidationService, to=ValidationService, scope=singleton)
    binder.bind(PikaService, to=PikaService(), scope=singleton)


def create_app():
    app = Flask(__name__)
    app.register_blueprint(validation_api, url_prefix='/validation')
    app.register_blueprint(regression_api, url_prefix='/logistic-regression')
    FlaskInjector(app=app, modules=[configure_di])
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', debug=True, port=5000)
