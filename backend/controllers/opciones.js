const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const Opcion = require('../models/opcion');

const getOpciones = (req, res) => {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM opciones';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Opcion', 'TextoOpcion', 'ID_Pregunta', 'ID_PreguntaSiguiente'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Opciones respuesta" });
        }

        if(req.query.ID_Opcion){
            conditions.push("opciones.ID_Opcion = ?");
            values.push(req.query.ID_Opcion);
        }
        if(req.query.ID_Pregunta){
            conditions.push("opciones.ID_Pregunta = ?");
            values.push(req.query.ID_Pregunta);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener las opciones de respuesta"});
            } else{
                const opciones = results.map(row => {
                    const opcion = new Opcion();
                    Object.assign(opcion, row);
                    return opcion.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getopciones',
                        opciones
                    })
                );
            }
        });
    });
}

const createOpciones = (req, res) => {
    return new Promise(function(resolve, reject) {
        const { TextoOpcion, ID_Pregunta, ID_PreguntaSiguiente } = req.body;

        // Primero verificar si ya existe una opción de respuesta con el mismo TextoOpcion y ID_Pregunta
        connection.query('SELECT * FROM opciones WHERE TextoOpcion = ? AND ID_Pregunta = ?', [TextoOpcion, ID_Pregunta], (error, results) => {
            if (error) {
                console.log(error);
                return reject({ statusCode: 500, message: "Error al verificar la opción de respuesta"});
            }

            if (results.length > 0) {
                // Si ya existe una opción de respuesta con el mismo TextoOpcion y ID_Pregunta, rechazar la creación
                return reject({ statusCode: 400, message: "Ya existe esta opción de respuesta para la pregunta"});
            }

            // Si no existe, proceder con la creación de la nueva opción de respuesta
            const nuevaOpcion = {
                TextoOpcion: TextoOpcion,
                ID_Pregunta: ID_Pregunta,
                ID_PreguntaSiguiente: ID_PreguntaSiguiente
            };
            connection.query('INSERT INTO opciones SET ?', nuevaOpcion, (error, results) => {
                if (error) {
                    console.log(error);
                    reject({ statusCode: 500, message: "Error al crear la opción de respuesta"});
                } else {
                    resolve(res.json({
                        ok: true,
                        msg: 'Opción de respuesta creada exitosamente'
                    }));
                }
            });
        });
    });
};


const updateOpcion = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Opcion;

        connection.query('UPDATE opciones SET ? WHERE ID_Opcion = ?', [req.body, id], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al actualizar la opción de respuesta"});
            } else if (results.affectedRows === 0) {
                // Ninguna fila fue afectada, es decir, no se encontró la opción de respuesta
                reject({ statusCode: 404, message: "Opción de respuesta no encontrada"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'Opción de respuesta actualizada',
                    id
                }));
            }
        });
    });
};


const deleteOpcion = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Opcion;
        
        // Primero verificar si la opción de respuesta existe
        connection.query('SELECT * FROM opciones WHERE ID_Opcion = ?', [id], (error, rows) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al eliminar la opción de respuesta"});
            } else {
                if (rows.length === 0) {
                    // Si la opción de respuesta no existe
                    reject({ statusCode: 404, message: "Opción de respuesta no encontrada" });
                } else {
                    // Si la opción de respuesta existe, proceder con la eliminación
                    connection.query('DELETE FROM opciones WHERE ID_Opcion = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            reject({ statusCode: 500, message: "Error al eliminar la opción de respuesta"});
                        } else {
                            resolve(res.json({
                                ok: true,
                                msg: 'Opción de respuesta eliminada',
                                id
                            }));
                        }
                    });
                }
            }
        });
    });
};


module.exports = { getOpciones, createOpciones, updateOpcion, deleteOpcion };