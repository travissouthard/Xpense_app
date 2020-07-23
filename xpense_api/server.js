const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI
console.log(mongodbURI)
require('dotenv').config()

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//Database Connection
mongoose.connect('mongodb://localhost:27017/xpense', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

//middleware
app.use(express.json())

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) >= 0) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

//Controller/Routes
const budgetsController = require("./controllers/budget.js");
app.use("/budgets", budgetsController);

app.get('/', (req, res) => {
  console.log("Oh hey! I got a request. Let me respond with something");
  res.redirect('/budgets');
});

app.listen(3000, ()=> {
    console.log("I am listening for requests!!!");
  });