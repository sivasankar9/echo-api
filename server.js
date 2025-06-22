var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const dbUrl = "mongodb://localhost:27017/echo-connect"; 
// var dbUrl = 'mongodb+srv://<username>:<password>@mongodb-e49d02ee-o2626ab53.database.cloud.ovh.net/admin?replicaSet=replicaset'
 
// try {
//    mongoose.connect(dbUrl);
//   console.log("connected")
// } catch (error) {
//   handleError(error);
// }

app = express();
const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=> {
    console.log(`hmm listeneing ${PORT}`);
});

// app.use(bodyParser.json());  
// app.use(bodyParser.urlencoded({extended: false}));

var Message = mongoose.model('users',{ name : String});
// console.log(" MyModel.find({});", Message.find({}))

app.get('/users', (req, res) => {
//   Message.find({},(err, messages)=> {
//     res.send(messages);
//   })
res.send({})
})

app.get('*', (req, res)=> {

    res.status(404).send({ error: true, message: 'No route found' });

});