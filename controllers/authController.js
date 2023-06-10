const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_MAX_AGE = 60 * 60;

const handleErrors = (err) => {
  let errors = {email: '', password: ''}

  //duplicate key error
  if(err.code === 11000){
    errors['email'] = 'This email is already registered'
    return errors;
  }
  //validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: JWT_MAX_AGE
  })
}

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
    const token = createToken(user._id);
    //setting cookie token
    res.cookie('jwt', token, {
      maxAge: JWT_MAX_AGE * 1000,
      httpOnly: true
    })
    //returning json 
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email
      }
    });
  }catch(err){
    let errors = handleErrors(err);
    res.status(400).json({ errors })
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