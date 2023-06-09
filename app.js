const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require('./middlewares/authMiddleware')
const app = express()

// middleware
dotenv.config();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('database connected'))
  .then(() => app.listen(process.env.PORT, 
    () => console.log(`server running at http://localhost:${process.env.PORT}`)))
  .catch((err) => console.log(err))

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

