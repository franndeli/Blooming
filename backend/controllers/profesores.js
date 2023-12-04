const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const getProfesores = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM profesor', (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener los profesores"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getProfesores',
                        results
                    })
                );
            }
        });
    });
}

const getProfesoresPorCriterio = (req, res) => {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM profesor';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Profesor', 'Nombre', 'Apellido', 'Especialidad', 'ID_Centro'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Profesores" });
        }

        if(req.query.ID_Profesor){
            conditions.push("ID_Profesor = ?");
            values.push(req.query.ID_Profesor);
        }
        if(req.query.Nombre){
            conditions.push("Nombre = ?");
            values.push(req.query.Nombre);
        }
        if(req.query.Apellido){
            conditions.push("Apellido = ?");
            values.push(req.query.Apellido);
        }
        if(req.query.Especialidad){
            conditions.push("Especialidad = ?");
            values.push(req.query.Especialidad);
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
                reject({ statusCode: 500, message: "Error al obtener el profesor"});
            } else {
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getProfesorByCriteria',
                        results
                    })
                );
            }
        });
    });
}


const createProfesor = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('INSERT INTO profesor SET ?', [req.body], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al crear el profesor"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'createProfesor'
                    })
                );
            }
        });
    });
}

const updateProfesor = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Profesor;
        connection.query('SELECT * FROM profesor WHERE ID_Profesor = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al actualizar el profesor"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Profesor no encontrado" });
                }else{
                    connection.query('UPDATE profesor SET ? WHERE ID_Profesor = ?', [req.body, id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'updateProfesor'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

const deleteProfesor = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Profesor;
        connection.query('SELECT * FROM profesor WHERE ID_Profesor = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al actualizar el profesor"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Profesor no encontrado" });
                }else{
                    connection.query('DELETE FROM profesor WHERE ID_Profesor = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteProfesor'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getProfesores, createProfesor, updateProfesor, deleteProfesor, getProfesoresPorCriterio };