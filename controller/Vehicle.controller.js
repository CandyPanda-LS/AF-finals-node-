const { response } = require("express");
const Vehicle = require("../models/Vehicle.model");
const Catagory = require("../models/Catagory.model");


//Add Vehicle
const addVehicle = async (req, res) => {
  if (req.body) {
    const vehicle = new Vehicle(req.body);
    await vehicle.save()
    .then(data => {
      if (data.catagories.length > 0) {
        data.catagories.map(async (category) => {
          await Catagory.findByIdAndUpdate(category, { $push: { Vehicles: data._id }}, { new: true, useFindAndModify: false })
        })
      }
      res.status(200).send(data);
    })
    .catch(error => {
      res.status(500).send(error.message);
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    Vehicle.findByIdAndUpdate(req.body.id)
      .then((existingVehicle) => {
        existingVehicle.code = req.body.code;
        existingVehicle.model = req.body.model;
        existingVehicle.type = req.body.type;
        existingVehicle.name = req.body.name;
        existingVehicle.catagories = req.body.catagories;


        existingVehicle
          .save()
          .then(() => res.json("Vehicle updated!"))
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteVehicle = async (req, res) => {
  try {
    Vehicle.findByIdAndDelete(req.body.id)
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

const getAllVeicle = async (req, res) => {
  try {
    const VehiclesList = await Vehicle.find().populate('Categories', '_id name');
    res.json(VehiclesList);
  } catch (err) {
    console.log(err.VehiclesList);
    res.status(500).send("Server Error");
  }
};

const getVehicleByID = async (req, res) => {
    try {
      const singleVehicle = await Vehicle.findById(req.body.id);
      res.json(singleVehicle);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };

  const getVehicleByName = async (req, res) => {
    try {
      const singleVehicle = await Vehicle.find({"name":req.body.name});
      res.json(singleVehicle);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  };

module.exports = {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVeicle,
  getVehicleByID,
  getVehicleByName,
};
