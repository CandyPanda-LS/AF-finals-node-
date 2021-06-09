const express = require('express');
const router = express.Router();
const {
    addVehicle,
    updateVehicle,
    deleteVehicle,
    getAllVeicle,
    getVehicleByID,
    getVehicleByName,
} = require('../controller/Vehicle.controller');


router.get('/', getAllVeicle);

router.post('/', addVehicle);

router.put('/', updateVehicle);

router.delete('/', deleteVehicle);

router.get('/getByID', getVehicleByID);

router.get('/getByName', getVehicleByName);



module.exports = router;
