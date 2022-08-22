const mongoose = require("mongoose");
//define a mongoose Schema
const userSchema = new mongoose.Schema({

  FistName: {type: String, },
  LastName: {type: String, },
  Age: Number,
});

//export the model 
module.exports = mongoose.model("user", userSchema);