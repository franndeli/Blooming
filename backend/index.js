const express = require('express');
const cors = require('cors');

require('./models/associations');
require('./database/configdb');
require('dotenv').config();
require('./helpers/reset');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/admins', require('./routes/admins'));
app.use('/api/centros', require('./routes/centros'));
app.use('/api/clases', require('./routes/clases'));
app.use('/api/profesores', require('./routes/profesores'));
app.use('/api/alumnos', require('./routes/alumnos'));

app.use('/api/preguntas', require('./routes/preguntas'));
app.use('/api/opciones', require('./routes/opciones'));
app.use('/api/resultados', require('./routes/respuestas'));
app.use('/api/sesiones', require('./routes/sesiones'));

app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    //console.log('http://localhost:' + process.env.PORT + '/api/ ');
});