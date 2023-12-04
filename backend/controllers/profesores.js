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

module.exports = { getProfesores, createProfesor, updateProfesor, deleteProfesor };