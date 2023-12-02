/* Importación de módulos */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/configdb');


/*Crear la app de express*/
const app = express();

dbConnection();

app.use(cors());  

app.use('/api/alumnos', require('./routes/alumnos'));

app.listen(process.env.PORT, () => {
    console.log('Prueba de conexión corriendo en http://localhost:' + process.env.PORT + '/api/alumnos ');
});

