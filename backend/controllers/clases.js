const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const Clase = require('../models/clase');

const getClases = (req, res) => {
    const tam = Number(process.env.TAMPORPAG);
    const desde = Number(req.query.desde) || 0;

    return new Promise(function(resolve, reject) {
        let query = 'SELECT clase.*, centro_escolar.Nombre AS NomCentro FROM clase LEFT JOIN centro_escolar ON clase.ID_Centro = centro_escolar.ID_Centro';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Clase', 'Nombre', 'NumAlumnos', 'ID_Centro', 'desde'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Clases" });
        }

        if(req.query.ID_Clase){
            conditions.push("ID_Clase = ?");
            values.push(req.query.ID_Clase);
        }
        if(req.query.Nombre){
            conditions.push("Nombre LIKE ?");
            values.push(`%${req.query.Nombre}%`);
        }
        if(req.query.NumAlumnos){
            conditions.push("NumAlumnos = ?");
            values.push(req.query.NumAlumnos);
        }
        if(req.query.ID_Centro){
            conditions.push("clase.ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ` LIMIT ${tam} OFFSET ${desde}`;

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
                        msg: 'getClases',
                        clases
                    })
                );
            }
        });
    });
}


const createClase = (req, res) => {
    return new Promise(function(resolve, reject) {
        const { Nombre, ID_Centro } = req.body;

        // Primero verificar si ya existe una clase con el mismo nombre y ID_Centro
        connection.query('SELECT * FROM clase WHERE Nombre = ? AND ID_Centro = ?', [Nombre, ID_Centro], (error, results) => {
            if (error) {
                console.log(error);
                return reject({ statusCode: 500, message: "Error al verificar la clase"});
            }

            if (results.length > 0) {
                // Si ya existe una clase con el mismo nombre y ID_Centro, rechazar la creación
                return reject({ statusCode: 400, message: "Ya existe una clase con este nombre en el centro especificado"});
            }

            // Si no existe, proceder con la creación de la nueva clase
            connection.query('INSERT INTO clase SET ?', [req.body], (error, results) => {
                if (error) {
                    console.log(error);
                    reject({ statusCode: 500, message: "Error al crear la clase"});
                } else {
                    resolve(res.json({
                        ok: true,
                        msg: 'createClase'
                    }));
                }
            });
        });
    });
};


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
                reject({ statusCode: 500, message: "Error al buscar la clase"});
            } else if(rows.length === 0){
                reject({ statusCode: 404, message: "Clase no encontrada" });
            } else {
                // Primero, actualizar ID_Clase de los profesores a null
                connection.query('UPDATE profesor SET ID_Clase = NULL WHERE ID_Clase = ?', [id], (error) => {
                    if (error) {
                        console.log(error);
                        return reject({ statusCode: 500, message: "Error al actualizar los profesores de la clase"});
                    }

                    // Eliminar todos los alumnos que pertenecen a esta clase
                    connection.query('DELETE FROM alumno WHERE ID_Clase = ?', [id], (error) => {
                        if (error) {
                            console.log(error);
                            reject({ statusCode: 500, message: "Error al eliminar los alumnos de la clase"});
                        } else {
                            // Luego, eliminar la clase
                            connection.query('DELETE FROM clase WHERE ID_Clase = ?', [id], (error) => {
                                if (error) {
                                    console.log(error);
                                    reject({ statusCode: 500, message: "Error al eliminar la clase"});
                                } else {
                                    resolve(res.json({
                                        ok: true,
                                        msg: 'Profesores actualizados y alumnos y clase eliminados correctamente'
                                    }));
                                }
                            });
                        }
                    });
                });
            }
        });
    });
};



module.exports = { getClases, createClase, updateClase, deleteClase };