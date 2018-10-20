from flask import Flask, render_template, url_for, copy_current_request_context
from flask_socketio import SocketIO, send, emit
from time import sleep
from threading import Thread, Event

app = Flask(__name__)
app.config['SECRET KEY'] = 'secret'
app.config['DEBUG'] = True

socketio = SocketIO(app)

thread = Thread()
thread_stop_event = Event()


class GiveThread(Thread):
    def __init__(self):
        super(GiveThread, self).__init__()


    def giveText(self):
        while not thread_stop_event.isSet():
            text = "hello"  
            socketio.emit('newtext', {'text': text}, namespace="/test")
            sleep(2)
    
    def run(self):
        self.giveText()

    
@app.route("/")
def index():
    return render_template('index.html')

@socketio.on('connect', namespace='/test')
def test_connect():
    global thread
    print ("connected")

    if not thread.isAlive():
        thread = GiveThread()
        thread.start()

@socketio.on('disconnect', namespace="/test")
def test_disconnect():
    print ('Client disconnected')

@socketio.on('message')
def handleMessage(msg):
    print('Message:  ' + msg)
    send(msg, broadcast=True)

    
if __name__ == '__main__':
    socketio.run(app)