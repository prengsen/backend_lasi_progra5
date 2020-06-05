const express = require('express');
const {check} = require('express-validator');


const router = express.Router();


//importamos modelo para error.
const HttpError = require('../models/http-error'); //paso 23

const placesControllers = require('../models/places-controller'); //paso 26



//paso 26
//router.get('/:pid', placesControllers.getPlaceById);
router.get('/:pid', placesControllers.getPlacesById);

router.get('user/:uid', placesControllers.getPlacesByUser);

//paso27
router.post(
    '/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 6}),
        check('address').not().isEmpty()
    ]
    ,
    placesControllers.createPlace);


//ruta para editar un place
router.patch('/:pid', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 6})
    ]
    ,placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;