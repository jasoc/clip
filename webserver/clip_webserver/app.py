from flask import Flask

from clip_pyclip import CPU

app = Flask(__name__)

@app.route('/')
def hello_world():
    c = CPU()
    c.detect()
    return c.modelName