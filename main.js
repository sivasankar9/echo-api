// server.js
const express = require('express');
var mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const skillsRouter = require('./routes/skills');
const Users = require('./schema/userSchema');
const singupModel = require('./schema/signupSchema');

// const dbUrl = 'mongodb+srv://siva:tiger@cluster0.dim2c.mongodb.net/echo-connect'
const PORT = process.env.PORT || 9000;
const dbUrl = 'mongodb://localhost:27017/echo-connect';
const app = express();
const whiteList = ['http://localhost:3000', 'https://echo-api-y6n3.onrender.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use('/skills', skillsRouter);
app.use(cors());
app.use(bodyParser.json());
mongoose.set('strictQuery', false);

const userSkillsSchema = new mongoose.Schema({
  path: String,
  username: String,
  skills: String,
});

var UserSkills = mongoose.model('userskills', userSkillsSchema);

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

app.get('/userskills', async (req, res) => {
  const ress = await UserSkills.find({}, { _id: 0 }).exec();
  console.log('UserSkills', ress);
  res.send(ress);
});

app.post('/signup', async (req, res) => {
  console.log('req', req.body);
  try {
    const newItem = new singupModel(req.body);
    console.log('NewITem', newItem);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/signup', async (req, res) => {
  try {
    const updatedData = req.body;
    const { firstname } = req.body;

    console.log('req', req.body.firstname);
    const item = await singupModel.findOneAndUpdate(
      { firstname: firstname },
      { $set: updatedData },
      { new: true, runValidators: true },
    );
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/signup', async (req, res) => {
  try {
    const { firstname } = req.body;
    console.log('req', req.body.firstname);
    const item = await singupModel.deleteOne({ firstname: firstname });
    if (item.deletedCount === 1) {
      return res.status(404).json({ message: 'Document deleted successfully.' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Document not found or not deleted' });
  }
});
