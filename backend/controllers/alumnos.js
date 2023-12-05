const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const moment = require('moment');
const hashPassword = require('../middleware/hashHelper');


const getAlumnos = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM alumno', (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener los alumnos"});
            } else {
                // Aquí convertimos las fechas antes de resolver
                const ajustarFechas = results.map(alumno => ({
                    ...alumno,
                    FechaNacimiento: moment(alumno.FechaNacimiento).format('DD-MM-YYYY')
                }));

                resolve(res.json({
                    ok: true,
                    msg: 'getAlumnos',
                    results: ajustarFechas
                }));
            }
        });
    });
}


const getAlumnosPorCriterio = (req, res) => {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM alumno';
        let conditions = [];
        let values = [];

        let validParams = ['ID_Alumno', 'Nombre', 'Apellidos', 'Usuario', 'Contraseña', 'FechaNacimiento', 'ID_Clase'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Alumnos" });
        }

        if(req.query.ID_Alumno){
            conditions.push("ID_Alumno = ?");
            values.push(req.query.ID_Alumno);
        }
        if(req.query.Nombre){
            conditions.push("Nombre = ?");
            values.push(req.query.Nombre);
        }
        if(req.query.Apellido){
            conditions.push("Apellido = ?");
            values.push(req.query.Apellido);
        }
        if(req.query.Usuario){
            conditions.push("Usuario = ?");
            values.push(req.query.Usuario);
        }
        if(req.query.Contraseña){
            conditions.push("Contraseña = ?");
            values.push(req.query.Contraseña);
        }
        if(req.query.FechaNacimiento){
            conditions.push("FechaNacimiento = ?");
            values.push(req.query.FechaNacimiento);
        }
        if(req.query.ID_Clase){
            conditions.push("ID_Clase = ?");
            values.push(req.query.ID_Clase);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el alumno"});
            } else {
                //AJUSTAMOS LAS FECHAS
                const ajustarFechas = results.map(alumno => ({
                    ...alumno,
                    FechaNacimiento: moment(alumno.FechaNacimiento).format('DD-MM-YYYY')
                }));
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getAlumnoPorCriterio',
                        results: ajustarFechas
                    })
                );
            }
        });
    });
}


const createAlumno = (req, res) => {
    return new Promise(function(resolve, reject) {
        //Comprobamos si existe el email
        const usuario = req.body.Usuario;
        
        connection.query('SELECT * FROM alumno WHERE Usuario = ?', [usuario], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al verificar el usuario"});
            } else if (results.length > 0) {
                // Si se encuentra un alumno con el mismo email, rechaza la petición
                reject({ statusCode: 400, message: "El usuario del alumno ya existe"});
            } else {
                // Si no existe, procede con la inserción
                
                //Hasheamos la contraseña para guardarla
                const hashedPassword = hashPassword(req.body.Contraseña);
                const newAlumno = { ...req.body, Contraseña: hashedPassword };

                connection.query('INSERT INTO alumno SET ?', [newAlumno], (insertError, insertResults) => {
                    if (insertError) {
                        reject({ statusCode: 500, message: "Error al crear el alumno"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'createAlumno'
                            })
                        );
                    }
                });
            }
        });
    });
};

const updateAlumno = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Alumno;

        //Comprobamos si hay una contraseña en el update
        if(req.body.Contraseña){
            const hashedPassword = hashPassword(req.body.Contraseña);
            
            req.body.Contraseña = hashedPassword;

            actualizarAlumno();
        } else{

            actualizarAlumno();
        }

        //Hacemos el update
        function actualizarAlumno() {
            connection.query('UPDATE alumno SET ? WHERE ID_Alumno = ?', [req.body, id], (error, results) => {
                if (error) {
                    reject({ statusCode: 500, message: "Error al actualizar el alumno"});
                } else {
                    resolve(
                        res.json({
                            ok: true,
                            msg: 'updateAlumno'
                        })
                    );
                }
            });
        }
    });
}

const deleteAlumno = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Alumno;
        connection.query('SELECT * FROM alumno WHERE ID_Alumno = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al eliminar el alumno"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Alumno no encontrado" });
                }else{
                    connection.query('DELETE FROM alumno WHERE ID_Alumno = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteAlumno'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getAlumnos, createAlumno, updateAlumno, deleteAlumno, getAlumnosPorCriterio };