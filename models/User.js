const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Invalid Email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password should be atleast 6 characters long']
  }
})

//hash password before saving to database
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

// static method to login user 
userSchema.statics.login = async function(email, password){
  const user = await this.findOne({ email });
  if(user){
    // email exist, now check for password match
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if(isPassCorrect){
      // all ok
      return user;
    }else{
      // password incorrect
      throw Error('incorrect password');
    }
  }else{
    // no such user email exist
    throw Error('incorrect email');
  }
}


const User = mongoose.model('user', userSchema);

module.exports = User;