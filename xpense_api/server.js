const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.get('/', (req, res) => {
    console.log("Oh hey! I got a request. Let me respond with something");
    res.send('Hello World!');
  });

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/xpense', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

  app.listen(3000, ()=> {
    console.log("I am listening for requests!!!");
  });