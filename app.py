from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello World from python!'

#app.run(host='localohost', port=80)
