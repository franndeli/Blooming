/* Importación de módulos */
const sequelize = require('./database/configdb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// (async () => {
//     try {
//         await sequelize.sync();
//     } catch (error) {
//     }
// })();

// app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/centros', require('./routes/centros'));
// app.use('/api/clases', require('./routes/clases'));
app.use('/api/admins', require('./routes/admins'));
// app.use('/api/profesores', require('./routes/profesores'));
// app.use('/api/preguntas', require('./routes/preguntas'));
// app.use('/api/opciones', require('./routes/opciones'));
// app.use('/api/resultados', require('./routes/respuestas'));

//Autenticación
// app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('http://localhost:' + process.env.PORT + '/api/ ');
});