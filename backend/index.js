/* Importación de módulos */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/configdb');


/*Crear la app de express*/
const app = express();

dbConnection();

app.use(cors());
app.use(express.json());

app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/centros', require('./routes/centros'));
app.use('/api/clases', require('./routes/clases'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/profesores', require('./routes/profesores'));

//Autenticación
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Prueba de conexión corriendo en http://localhost:' + process.env.PORT + '/api/alumnos ');
    console.log('Prueba de conexión corriendo en http://localhost:' + process.env.PORT + '/api/centros ');
    console.log('Prueba de conexión corriendo en http://localhost:' + process.env.PORT + '/api/clases ');
    console.log('Prueba de conexión corriendo en http://localhost:' + process.env.PORT + '/api/profesores ');
});

