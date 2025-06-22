// server.js
const express = require('express');
var mongoose = require('mongoose');
const cors = require('cors');
const dbUrl = 'mongodb+srv://siva:tiger@cluster0.dim2c.mongodb.net/echo-connect'
const PORT = process.env.PORT || 9000;
// const dbUrl = 'mongodb://localhost:27017/echo-connect';
const app = express();
app.use(cors({
        origin: "https://echo-api-y6n3.onrender.com"
    }
));
app.options('*', cors())

mongoose.set('strictQuery', false);
const userSchema = new mongoose.Schema({
  name: String,
  pwd: String,
});
const userSkillsSchema = new mongoose.Schema({
  path: String,
  username: String,
  skills: String,
});
var UserSkills = mongoose.model('skills', userSkillsSchema);

var Users = mongoose.model('users', userSchema);
app.get('/', (req, res) => {
  res.send('Hello from Express with Nodemon!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
async function main() {
  console.log('connected');
  await mongoose.connect(dbUrl);
}
main().catch(err => console.log(err));

app.get('/users', async (req, res) => {
  const ress = await Users.find({}, { _id: 0 }).exec();
  console.log('ress', ress);
  res.send([ress]);
});
app.get('/skills', async (req, res) => {
  const ress = await UserSkills.find({}, { _id: 0 }).exec();
  console.log('UserSkills', ress);
  res.send(ress);
});
