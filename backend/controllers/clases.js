const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const Clase = require('../models/clase');

const getClases = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM clase', (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener las clases"});
            }else{
                const clases = results.map(row => {
                    const clase = new Clase();
                    Object.assign(clase, row);
                    return clase.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getClases',
                        clases
                    })
                );
            }
        });
    });
}

const getClasesPorCriterio = (req, res) => {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM clase';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Clase', 'Nombre', 'NumAlumnos', 'ID_Centro'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Clases" });
        }

        if(req.query.ID_Clase){
            conditions.push("ID_Clase = ?");
            values.push(req.query.ID_Clase);
        }
        if(req.query.Nombre){
            conditions.push("Nombre = ?");
            values.push(req.query.Nombre);
        }
        if(req.query.NumAlumnos){
            conditions.push("NumAlumnos = ?");
            values.push(req.query.NumAlumnos);
        }
        if(req.query.ID_Centro){
            conditions.push("ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener la clase"});
            } else{
                const clases = results.map(row => {
                    const clase = new Clase();
                    Object.assign(clase, row);
                    return clase.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getClasesPorCriterio',
                        clases
                    })
                );
            }
        });
    });
}


const createClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO clase SET ?', [req.body], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al crear la clase"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'createClase'
                    })
                );
            }
        });
    });
}

const updateClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Clase;
        connection.query('SELECT * FROM clase WHERE ID_Clase = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al actualizar la clase"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Clase no encontrada" });
                }else{
                    connection.query('UPDATE clase SET ? WHERE ID_Clase = ?', [req.body, id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'updateClase'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

const deleteClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Clase;
        connection.query('SELECT * FROM clase WHERE ID_Clase = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al eliminar la clase"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Clase no encontrada" });
                }else{
                    connection.query('DELETE FROM clase WHERE ID_Clase = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteClase'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getClases, createClase, updateClase, deleteClase, getClasesPorCriterio };