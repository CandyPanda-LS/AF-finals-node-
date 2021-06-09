const express = require('express');
const router = express.Router();
const {
    addCatagory,
  updateCatagory,
  deleteCatagory,
  getAllCatagory,
  getVehiclesInCatagory,
  getVehiclesForCatagory
  } = require('../controller/Catagory.controller');


router.get('/', getAllCatagory);

router.get('/getVehiclesInCatagory', getVehiclesInCatagory);

router.get('/getVehiclesForCatagory', getVehiclesForCatagory);

router.post('/', addCatagory);

router.put('/', updateCatagory);

router.delete('/', deleteCatagory);


module.exports = router;
