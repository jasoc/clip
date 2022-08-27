from flask import Flask

from pyclip import CPU

app = Flask(__name__)

@app.route('/')
def hello_world():
    c = CPU()
    # c.detect()
    return c.modelName