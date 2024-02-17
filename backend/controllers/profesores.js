const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const hashPassword = require('../middleware/hashHelper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Profesor = require('../models/profesor');

const getProfesores = (req, res) => {
    const tam = Number(req.query.numFilas) || 0;
    const desde = Number(req.query.desde) || 0;
    const texto = req.query.texto;
    let textoBusqueda = '';

    if(texto){
        textoBusqueda = new RegExp(texto, 'i');
        console.log('texto', texto, ' textoBusqueda', textoBusqueda);
    }

    return new Promise(function(resolve, reject) {
        let query = 'SELECT profesor.*, centro_escolar.Nombre AS NomCentro, clase.Nombre AS NomClase FROM profesor LEFT JOIN centro_escolar ON profesor.ID_Centro = centro_escolar.ID_Centro LEFT JOIN clase ON profesor.ID_Clase = clase.ID_Clase';
        let countQuery = 'SELECT COUNT(*) AS total FROM profesor';
        let conditions = [];
        let countConditions = [];
        let values = [];
        let validParams = ['ID_Profesor', 'Nombre', 'Apellidos', 'Email', 'Contraseña', 'ID_Clase', 'ID_Centro', 'desde', 'texto', 'numFilas'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Profesores" });
        }

        if(req.query.ID_Profesor){
            conditions.push("profesor.ID_Profesor = ?");
            values.push(req.query.ID_Profesor);
        }
        if(req.query.Nombre){
            conditions.push("profesor.Nombre LIKE ?");
            values.push(`${req.query.Nombre}%`);
        }
        if(req.query.Apellido){
            conditions.push("profesor.Apellidos LIKE ?");
            values.push(`${req.query.Apellidos}%`);
        }
        if(req.query.Email){
            conditions.push("profesor.Email LIKE ?");
            values.push(`${req.query.Email}%`);
        }
        if(req.query.ID_Clase){
            conditions.push("profesor.ID_Clase = ?");
            countConditions.push("profesor.ID_Clase = ?");
            values.push(req.query.ID_Clase);
        }
        if(req.query.ID_Centro){
            conditions.push("profesor.ID_Centro = ?");
            countConditions.push("profesor.ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        if (countConditions.length > 0) {
            countQuery += ' WHERE ' + countConditions.join(' AND ');
        }

        if(tam > 0){
            query += ` LIMIT ${tam} OFFSET ${desde}`;
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el profesor"});
            } else {
                connection.query(countQuery, values, (error, countRes) => {
                    if(error){
                        console.log(countQuery);
                        reject({ statusCode: 500, message: "Error al obtener el número total de profesores"});
                    }else {
                        const total = countRes[0].total;
                        const profesores = results.map(row => {
                            const profesor = new Profesor();
                            Object.assign(profesor, row);
                            return profesor.toJSON();
                        });
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'getProfesores',
                                profesores,
                                page: {
                                    desde,
                                    tam,
                                    total
                                }
                            })
                        );
                    }
                })
            }
        });
    });
}


const createProfesor = (req, res) => {
    return new Promise(function(resolve, reject) {
        const { Email, ID_Centro } = req.body;

        // Comprobación de si existe ya el email
        connection.query('SELECT * FROM profesor WHERE Email = ? AND ID_Centro = ?', [Email, ID_Centro], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al verificar el email"});
            } else if (results.length > 0) {
                //Si se encuentra profesor con el mismo email, rechaza la petición
                reject({ statusCode: 400, message: "El email de este profesor ya está registrado en el centro"});
            } else {
                // Cifrar la contraseña antes de insertar
                const hashedPassword = hashPassword(req.body.Contraseña);
                const newProfesor = { ...req.body, Contraseña: hashedPassword };

                // Insertar en la base de datos
                connection.query('INSERT INTO profesor SET ?', [newProfesor], (insertError, insertResults) => {
                    if (insertError) {
                        reject({ statusCode: 500, message: "Error al crear el profesor"});
                    } else {
                        resolve(res.json({ ok: true, msg: 'createProfesor' }));
                    }
                });
            }
        });
    });
};


const updateProfesor = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Profesor;

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        connection.query('UPDATE profesor SET ? WHERE ID_Profesor = ?', [req.body, id], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al actualizar el Profesor"});
            } else if (results.affectedRows === 0) {
                // Ninguna fila fue afectada, es decir, no se encontró el Profesor
                reject({ statusCode: 404, message: "Profesor no encontrado"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'updateProfesor',
                    id
                }));
            }
        });
    });
};


    function verify(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWTSECRET);
            return decodedToken;
        } catch (error) {
            return false;
        }
    }

const updateProfesorPwd = (req, res) => {
    return new Promise(function(resolve, reject){
        const token = req.header('x-token');
        const id = req.params.ID_Profesor;
        const { Contraseña, newPassword, newPassword2 } = req.body;

        if(!(verify(token).Rol == 'Profesor' && verify(token).ID == id)){
            return res.status(400).json({
                ok: false,
                message: 'No tienes permisos para actualizar la contraseña',
            });
        }

        connection.query('SELECT Nombre, Contraseña FROM profesor WHERE ID_Profesor = ?', [id], (error, datos) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al buscar el Profesor"});
            } else if (datos.affectedRows === 0) {
                reject({ statusCode: 404, message: "Profesor no encontrado"});
            } else {
                const pwdOk = bcrypt.compareSync(Contraseña, datos[0].Contraseña);
                if(verify(token).ID == id){
                    if(newPassword !== newPassword2){
                        return res.status(400).json({
                            ok: false,
                            message: 'Las contraseñas no coinciden',
                        });
                    }
                    if(!pwdOk){
                        return res.status(400).json({
                            ok: false,
                            message: 'Contraseña incorrecta',
                        });
                    }
                }
                const hashedPassword = hashPassword(newPassword);
                const newPwd = hashedPassword;

                connection.query('UPDATE profesor SET Contraseña = ? WHERE ID_Profesor = ?', [newPwd, id], (setError, setResults) => {
                    if (setError) {
                        reject({ statusCode: 500, message: "Error al cambiar la contraseña"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'Contraseña actualizada de Profesor'
                            })
                        );
                    }
                })
            }
        });
    });
};


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

module.exports = { getProfesores, createProfesor, updateProfesor, deleteProfesor, updateProfesorPwd };