from flask import Flask, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Hello(resource)
    def get(self):
        return 'Hellow World From Python!'
    
api.add_resource(Hellow, '/')

if __name__ == '__main__':
    app.run('0.0.0.0','80')
