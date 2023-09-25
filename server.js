const express = require('express')
const app = express()
const port = 80

var { Liquid } = require('liquidjs');
var engine = new Liquid();

// register liquid engine
app.engine('liquid', engine.express()); 
app.set('views', './templates');
app.set('view engine', 'liquid');


users = {}


app.get('/', (req, res) => {
  userdata = Object.values(users)
  userdata.sort((a,b) => {
    let name1 = a.name.toUpperCase()
    let name2 = b.name.toUpperCase()
    let tickets1 = a.tickets
    let tickets2 = b.tickets
    if(tickets1 < tickets2){
      return 1
    }
    if(tickets1 > tickets2){
      return -1
    }
    if(name1 < name2){
      return -1
    }
    if(name1 > name2){
      return 1
    }
    return 0
  })
  res.render("leaderboard", {"users" : userdata})
})

app.get("/addTokens", (req, res) => {
  let id = req.query.id
  let amount = req.query.amount
  if ( !(id in users) || amount === "" || isNaN(amount)){
    res.send("0");
  }
  else{
    (users[id])["tokens"] += parseInt(amount)
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
  if ( !( id in users ) || amount === "" || isNaN(amount)){
    res.send("0");
  }
  else{ 
    (users[id])["tickets"] += parseInt(amount)
    res.send("1")
  }
})

app.get('/addUser', (req, res) => {
  let id = req.query.id
  let amount = req.query.amount
  let name = req.query.name
  if ( ( id in users ) || id === "" || amount === "" || isNaN(amount) || name === ""){
    res.send("0")
  }
  else{
    users[id] = {"name" : name, "tokens" : parseInt(amount), "tickets" : 0 }
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})