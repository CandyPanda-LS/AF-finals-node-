const { response } = require("express");
const Catagory = require("../models/Catagory.model");

//Add Vehicle
const addCatagory = async (req, res) => {
  const { name ,price, Vehicles } = req.body;

  try {
    //create a Vehicle instance
    const catagoryObj = new Catagory({
        name , 
        price,
        Vehicles
    });

    //save to the database
    await catagoryObj.save()
      .then((catagory) => res.json(catagory))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    //Something wrong with the server
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
};

const updateCatagory = async (req, res) => {
  try {
    Catagory.findByIdAndUpdate(req.body.id)
      .then((existingCatagory) => {
        existingCatagory.name = req.body.name;
        existingCatagory.Vehicles = req.body.Vehicles;

        existingCatagory
          .save()
          .then(() => res.json("Catagory updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteCatagory = async (req, res) => {
  try {
    Catagory.findByIdAndDelete(req.body.id)
      .then(() => {
        res.status(200).json("Deleted");
      })
      .catch(() => {
        res.status(200).json("Server error");
      });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getAllCatagory = async (req, res) => {
  try {
    const CatagoryList = await Catagory.find();
    res.json(CatagoryList);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const getVehiclesInCatagory = async (req, res) => {
    try {
      const VehiclesInCatagory = await Presenter.find({
        "name": req.body.name,
      }).select(
        "Vehicles"
      );
      res.json(VehiclesInCatagory);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

const getVehiclesForCatagory = async (req,res) =>{
  if (req.body) {
    await Catagory.findById(req.body.id).populate('Vehicles', '_id name type model code')
    .then(data => {
      res.status(200).send(data.Vehicles);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
  }
}

module.exports = {
    addCatagory,
  updateCatagory,
  deleteCatagory,
  getAllCatagory,
  getVehiclesInCatagory,
  getVehiclesForCatagory
};
