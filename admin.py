import requests
from cardReader import CardReader

def admin(id):
    print("read in card id " + id)
    mode = input("what do you want to do? (addTokens, addTickets, charge, addUser, removeUser)")
    while mode not in ["addTokens", "addTickets", "charge", "addUser", "removeUser"]:
        mode = input("please enter a valid option (addTokens, addTickets, charge, addUser, removeUser)")
    if mode == "addTokens" or mode == "addTickets" or mode == "charge" or mode == "addUser":
        amount = input("Please enter an amount")
        name = ""
        try:
            amount = int(amount)
        except:
            print("Please enter a valid integer")
            return
        if mode == "addUser":
            name = input("Please enter a name")
        v = requests.get("https://arcade-52bs.onrender.com/" + mode, params={"id" : id, "amount" : amount, "name" : name})
        if v.text == "1":
            print("success")
        else:
            print("failure")
    elif mode == "removeUser":
        v = requests.get("https://arcade-52bs.onrender.com/removeUser", params={"id" : id})
