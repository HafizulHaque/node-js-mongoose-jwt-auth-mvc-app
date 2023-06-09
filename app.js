const express = require('express');
const mongoose = require('mongoose');
const { PORT, DB_USER, DB_PASSWORD, DB_NAME } = require('./env')
const authRoutes = require('./routes/authRoutes')
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.lfv1ilu.mongodb.net/${DB_NAME}`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((connect) => console.log('database connected'))
  .then(() => app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`)))
  .catch((err) => console.log(err))

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes)
