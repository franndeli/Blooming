const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const getAlumnos = (req, res) => {
    connection.query('SELECT * FROM alumnos', (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        res.json({
            ok: true,
            msg: 'getAlumnos',
            results
        })
    });    
}

module.exports = { getAlumnos };