import pydirectinput
from ctypes import wintypes
import win32gui as wgui
import win32process as wproc
import win32api as wapi
import keyboard
from threading import Timer
import requests

person_id = ""
waiting_rest_of_input = False
accepting_input = True

game_id = 0
game_names = {0 : "ChuckECheese's Match Game [cecmatch] - MAME 0.258 (LLP64)"}
game_costs = {0: 1}

handle = wgui.FindWindow(None, game_names[game_id])
remote_thread, _ = wproc.GetWindowThreadProcessId(handle)
wproc.AttachThreadInput(wapi.GetCurrentThreadId(), remote_thread, True)
wgui.SetFocus(handle)

def confirm():
    global accepting_input
    global person_id
    global waiting_rest_of_input
    accepting_input = False
    print("found account number" + person_id)
    v = requests.get("http://localhost:3000/charge", params={"id" : person_id, "cost" : game_costs[game_id]})
    print("found: " + v.text)
    if bool(int(v.text)):
        pydirectinput.keyDown("c")
        pydirectinput.keyUp("c")
    else:
        print("denied for whateer reason")
    person_id=""
    waiting_rest_of_input = False
    accepting_input = True
    

def key_pressed(e, *a, **kw):
    global person_id
    global waiting_rest_of_input
    global accepting_input
    if accepting_input:
        k = e.name
        person_id += k
        if not waiting_rest_of_input:
            waiting_rest_of_input = True
            t = Timer(1.0, confirm, ())
            t.start()

keyboard.on_press(key_pressed)
keyboard.wait()