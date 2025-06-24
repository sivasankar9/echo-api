const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    skills: String,

});
module.exports =  mongoose.model('skills', skillsSchema);