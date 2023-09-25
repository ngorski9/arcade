const express = require('express')
const app = express()
const port = 80

users = {}

function get_user(id){
  if (!(id in users)){
    users[id] = {"id" : id, "tokens" : 0, "tickets" : 0}    
  }
  return users[id]
}

app.get('/', (req, res) => {
  if(Object.keys(users).length == 0){
    res.send("there are no users")
  }
  else{
    res.send( users )
  }
})

app.get("/addTokens", (req, res) => {
  let id = req.query.id
  let amount = req.query.amount
  if (id === "" || amount === "" || isNaN(amount)){
    res.send("0");
  }
  else{
    user = get_user(id) 
    user["tokens"] += parseInt(amount)
    res.send("1")
  }
})

app.get('/charge', (req, res) => {
    id = req.query.id;
    amount = req.query.amount;
    if ( !( id in users ) || amount === "" || isNaN(amount)){
        res.send("0");
    }
    else{
      amount = parseInt(amount)
      if(amount > (users[id])["tokens"]){
          res.send("0")
      }
      else{
          (users[id])["tokens"] -= amount
          res.send("1")
      }
    }
})

app.get('/addTickets', (req, res) => {
  let id = req.query.id
  let amount = req.query.amount
  if (id === "" || amount === "" || isNaN(amount)){
    res.send("0");
  }
  else{
    user = get_user(id) 
    user["tickets"] += parseInt(amount)
    res.send("1")
  }
})

app.get('/removeUser', (req, res) => {
  let id = req.query.id
  if(id in users){
    delete users[id]
    res.send("1")
  }
  else{
    res.send("0")
  }
})

app.get("/ping", (req, res) => {
  res.send("ping")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})