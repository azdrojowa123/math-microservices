from flask import Flask

from src.queuingSystem.consumer import started_consuming


def create_app():
    started_consuming()
    app = Flask(__name__)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', debug=True, port=5001)
