import os

from flask import Flask
from flask_injector import FlaskInjector, request

from routes.validation_route import validation_api, regression_api
from services.validation_service import ValidationService


def configure_di(binder):
    binder.bind(ValidationService, to=ValidationService, scope=request)


def create_app():
    app = Flask(__name__)
    app.register_blueprint(validation_api, url_prefix='/validation')
    app.register_blueprint(regression_api, url_prefix='/logistic-regression')
    FlaskInjector(app=app, modules=[configure_di])
    return app


if __name__ == '__main__':
    app = create_app()
    print(os.getenv('pswd'))
    app.run(host='0.0.0.0', debug=True, port=5000)
