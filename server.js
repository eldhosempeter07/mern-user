const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require("colors")
const users = require('./routes/user')
const cors = require('cors');
const app = express();

app.use(cors());

dotenv.config({ path: './config/config.env' })

connectDB();

app.use(express.urlencoded({ extended: true }))

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/user', users)


app.get('/', (req, res) => {
    console.log("hello");
    res.send('Hello World')
  })

  app.post('/quotes', (req, res) => {
    console.log(req.body)
  })

  const PORT = process.env.PORT || 5000


  app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


  // mongodb+srv://eldhosempeter:test123@codesouls.cfrrd.mongodb.net/expense-tracker?
  // retryWrites=true&w=majority