const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatagorySchema = new Schema({
  name: {
      type: String,
      required: true,
      trim:true
  },
  
  price :{
    type:Number,
    required:true,
  },

  Vehicles: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Vehicle"
    }
  ]
});
module.exports = Catagory = mongoose.model("Catagory", CatagorySchema);
