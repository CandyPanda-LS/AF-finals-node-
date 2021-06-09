const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({

  code:{
    type:String
  },
  model:{
    type:String
  },
  type:{
    type:String
  },
  name:{
    type:String
  },
  catagories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory"
    }
  ]
});
module.exports = Vehicle = mongoose.model("Vehicle", VehicleSchema);
