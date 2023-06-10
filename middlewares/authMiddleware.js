const jwt = require('jsonwebtoken');


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(err){
        //wrong token
        res.redirect('/login');
      }else{
        //all ok
        next();
      }
    })
  }else{
    //no token
    res.redirect('/login');
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if(!err){
        //all ok
        res.locals.userEmail = decodedToken.email
      }
    })
  }else{
    //no token
    res.locals.userEmail = null
  }
  next();
}

module.exports = {
  requireAuth,
  checkUser
}