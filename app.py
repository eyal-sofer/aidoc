from flask import Flask, request
from flask_restful import Resource, Api
import sys

app = Flask(__name__)
api = Api(app)

class Hello(Resource):
    def get(self):
        return 'Hello World, ' + os.environ['RUN_NUM']
    
api.add_resource(Hello, '/')

if __name__ == '__main__':
    app.run('0.0.0.0','80')
