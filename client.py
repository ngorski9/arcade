import socketio
import pyautogui

sio = socketio.Client()

game_id = 0

@sio.event
def connect():
    print("connected to server")

@sio.event
def start():
    print("received the start signal")
    pyautogui.keyDown('c')
    pyautogui.keyUp('c')

@sio.event
def query_name(data):
    sio.emit('identify', game_id)
    print("sent game id " + str(game_id) + " to server")

sio.connect('https://arcade-52bs.onrender.com')
sio.wait()