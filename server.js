const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3003

const mongodbURI = process.env.MONGODBURI || 'mongodb://localhost:27017/xpense'
console.log(mongodbURI)
require('dotenv').config()

// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//Database Connection
mongoose.connect(mongodbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
})
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

//middleware
app.use(express.json())
app.use(
  session({
    secret: process.env.JWT_SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
  })
)
const whitelist = ['http://localhost:3000', 'https://xpensefrontend.herokuapp.com/', "https://xpensefrontend.herokuapp.com"];
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

const userController = require('./controllers/userRouter.js')
app.use('/user', userController)

app.get('/', (req, res) => {
  res.redirect('/budgets');
});

app.listen(PORT, ()=> {
    console.log("I am listening for requests at port:", PORT);
  });