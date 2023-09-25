import keyboard
from threading import Timer

class CardReader:

    def __init__(self):
        self.id = ""
        self.waiting_rest_of_input = False
        self.accepting_input = True
        self.onRead = self.output_id

    def output_id(self, id):
        print(self.id)

    def confirm(self):
        self.accepting_input = False
        self.onRead(self.id)
        self.id=""
        self.waiting_rest_of_input = False
        self.accepting_input = True
    
    def key_pressed(self, e, *a, **kw):
        if self.accepting_input:
            k = e.name
            if k not in ['left shift', 'right shift', 'enter']:
                self.id += k
                if not self.waiting_rest_of_input:
                    self.waiting_rest_of_input = True
                    t = Timer(1.0, self.confirm, ())
                    t.start()

    def start(self):
        keyboard.on_press(self.key_pressed)
        keyboard.wait()

if __name__ == "__main__":
    c = CardReader()
    c.start()