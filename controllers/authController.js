const User = require('../models/User')

const signup_get = (req, res) => {
  res.render('signup')
}

const login_get = (req, res) => {
  res.render('login')
}

const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.create({ email, password })
    res.status(201).json(user);
  }catch(err){
    console.log(err);
  }
}

const login_post = (req, res) => {
  res.json(req.body)
}

const logout_get = (req, res) => {
  res.send('logout')
}


module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get
}