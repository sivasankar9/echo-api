const mongoose = require('mongoose');
const singupSchema = new mongoose.Schema(
  {
    firstname: String,
    emailaddress: String,
    password: String,
    agreeterms: Boolean,
  },
  { collection: 'signup' },
);

module.exports =  mongoose.model('signup', singupSchema);
