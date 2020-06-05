const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/user-routes');

const HttpError = require('./models/http-error');

//creamos apliacion
const app = express();

//paso 27
app.use(bodyParser.json());

//middleware
app.use('/api/places', placesRoutes);

//middleware
app.use('/api/users', userRoutes);

//manejo de error
app.use((req, res, next) => {
    const error =  new HttpError('No se encontró la ruta solicitada.', 404);
    throw error;
});

//middleware para manejo de errores
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }

    res.status(error.code || 500);
    res.json({errorMessage: error.message} || 'Ah ocurrido un error inesperado');
});

app.listen(5000);   