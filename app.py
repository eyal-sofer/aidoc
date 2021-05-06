from flask import Flask

app = Flask(__name__)

@app.route('/hello')
def helloIndex():
    return 'Hello World'

app.run(host='localohost', port=8080)
