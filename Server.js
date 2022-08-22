const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config({ path: "./config/.env" });

app.use(express.json());
mongoose.connect(process.env.MONGO_URI, (err) =>
  err ? console.log(err) : console.log("server connected")
);

const User = require("./Models/User");




/*
//Create a document instance
const user = new User({
    FistName: "Jad",
    LastName :"Clue",
    Age: 36,
})
//Save a Record of a Model
 user.save(function (err, data) {
 if (err) return console.log(err);
    //returned document instance in the callback
  else {console.log("one user saved");}});
*/


//Create the Routes
// 1 _GET :  RETURN ALL USERS 
/*
User.find()
  .then((data) => {console.log(data);})
  */
 /*
  app.get("/all", (req, res) => {
    User.find()
      .then((data) => res.send(data))
      .catch((err) => res.send(err));
  });
*/

  //return all users
  app.get('/api/users' , async (req, res) => { 
    try {
        const all = await User.find()
        res.json(all)
    } catch (error) {
        res.status(500).json({message: error.message}) }})

//POST :  ADD A NEW USER TO THE DATABASE 
app.post('/api/create', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Age: req.body.email});
        const newUser = await user.save()
        res.status(201).json(newUser)})




//       PUT : EDIT A USER BY ID 
app.put('/api/update' , async (req, res) => { 
    const findUser = await User.findByIdAndUpdate(req.params.id,req.body,{new: true})
        res.status(200).json(findUser)})

//      DELETE : REMOVE A USER BY ID 
app.delete('/api/delete/:id' , async (req, res) => { 
        const deleteUser= await User.findByIdAndRemove(req.params.id)
        res.status(200).json({message: 'User deleted'})
})


app.listen(4000, () => console.log("is running"));
