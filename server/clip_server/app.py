import flask
import pyclip

print(pyclip.CPU)
conf = pyclip.conf()

app = flask.Flask(__name__)

@app.route('/')
def hello_world():
    c = pyclip.CPU()
    o = pyclip.OS()

    return {
        "os":    str(o),
        "name":  c.modelName,
        "debug": conf.debug
    }

def start_clip_server() -> None:
    if not conf.debug:
        app.run('0.0.0.0', port=5000,
                debug=False, use_debugger=False)
    else:
        app.run('0.0.0.0', port=5000,
                debug=True, use_debugger=True)