const {v4:uuidv4} = require('uuid'); //import de node.

const HttpError = require('../models/http-error');

const {validationResult} = require('express-validator');


const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Preng Biba',
        email: 'prengsen@galileo.edu',
        password: '12345'
    }
];

const getUsers = (req, res, next) => {
    res.status(200).json({user: DUMMY_USERS});
};

const singup = (req, res, next) => {
    const error = validationResult(req);
    if(!(error.isEmpty())){
        throw new HttpError('Argumentos invalidos', 422);
    }

    const {name, email, password} = req.body;
    const createdUser = {
        id: uuidv4(),
        name: name,
        email: email,
        password: password
    }

    DUMMY_USERS.push(createdUser);
    res.status(201).json({message: 'Usuario creado exitosamente.'});
};

const login = (req, res, next) => {
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(u => (u.email === email));
    if((!identifiedUser) || (identifiedUser.password !== password)){
        throw new HttpError('No se identifico al usuario, las credenciales son incorrectas', 401);
    }

    res.json({message: "TRUE"});
};

exports.getUsers = getUsers;
exports.singup = singup;
exports.login = login;