import socketio
import pydirectinput
from ctypes import wintypes
import win32gui as wgui
import win32process as wproc
import win32api as wapi

sio = socketio.Client()

game_id = 0

@sio.event
def connect():
    print("connected to server")

@sio.event
def start():
    print("received the start signal")
    handle = wgui.FindWindow(None, "ChuckECheese's Match Game [cecmatch] - MAME 0.258 (LLP64)")
    remote_thread, _ = wproc.GetWindowThreadProcessId(handle)
    wproc.AttachThreadInput(wapi.GetCurrentThreadId(), remote_thread, True)
    wgui.SetFocus(handle)

    #pydirectinput.keyDown("c")
    #pydirectinput.keyUp("c")

@sio.event
def query_name(data):
    sio.emit('identify', game_id)
    print("sent game id " + str(game_id) + " to server")

sio.connect('https://arcade-52bs.onrender.com')
sio.wait()