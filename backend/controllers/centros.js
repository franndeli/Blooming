const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const hashPassword = require('../middleware/hashHelper');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Centro = require('../models/centro');

const getCentros = (req, res) => {
    const tam = Number(process.env.TAMPORPAG);
    const desde = Number(req.query.desde) || 0;

    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM centro_escolar';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Centro', 'Nombre', 'Email', 'Localidad', 'Provincia', 'Calle', 'CP', 'desde'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Centros" });
        }

        if(req.query.ID_Centro){
            conditions.push("centro_escolar.ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }
        if(req.query.Nombre){
            conditions.push("centro_escolar.Nombre LIKE ?");
            values.push(`${req.query.Nombre}%`);
        }
        if(req.query.Email){
            conditions.push("centro_escolar.Email LIKE ?");
            values.push(`${req.query.Email}%`);
        }
        if(req.query.Localidad){
            conditions.push("centro_escolar.Localidad LIKE ?");
            values.push(`${req.query.Localidad}%`);
        }
        if(req.query.Provincia){
            conditions.push("centro_escolar.Provincia LIKE ?");
            values.push(`${req.query.Provincia}%`);
        }
        if(req.query.Calle){
            conditions.push("centro_escolar.Calle LIKE ?");
            values.push(`%${req.query.Calle}%`);
        }
        if(req.query.CP){
            conditions.push("centro_escolar.CP LIKE ?");
            values.push(`%${req.query.CP}%`);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        //quitar este if, solo para pruebas de get
        if(req.query.desde){
            query += ` LIMIT ${tam} OFFSET ${desde}`;
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el centro"});
            } else{
                const centros = results.map(row => {
                    const centro = new Centro();
                    Object.assign(centro, row);
                    return centro.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getCentros',
                        centros
                    })
                );
            }
        });
    });
}


const createCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        const email = req.body.Email;

        //Comprueba si el email ya existe
        connection.query('SELECT * FROM centro_escolar WHERE Email = ?', [email], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al verificar el email"});
            } else if (results.length > 0) {
                // Si se encuentra un centro con el mismo email, rechaza la petición
                reject({ statusCode: 400, message: "El email ya existe en otro centro"});
            } else {
                //Ciframos la contraseña antes de insertar
                const hashedPassword = hashPassword(req.body.Contraseña);
                const newCentro = { ...req.body, Contraseña: hashedPassword };

                connection.query('INSERT INTO centro_escolar SET ?', [newCentro], (insertError, insertResults) => {
                    if (insertError) {
                        reject({ statusCode: 500, message: "Error al crear el centro"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'createCentro',
                                newCentro
                            })
                        );
                    }
                });
            }
        });
    });
};


const updateCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Centro;

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        connection.query('UPDATE centro_escolar SET ? WHERE ID_Centro = ?', [req.body, id], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al actualizar el Centro"});
            } else if (results.affectedRows === 0) {
                // Ninguna fila fue afectada, es decir, no se encontró el Centro
                reject({ statusCode: 404, message: "Centro no encontrado"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'updateCentro',
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

const updateCentroPwd = (req, res) => {
    return new Promise(function(resolve, reject){
        const token = req.header('x-token');
        const id = req.params.ID_Centro;
        const { Contraseña, newPassword, newPassword2 } = req.body;

        if(!(verify(token).Rol == 'Centro' && verify(token).ID == id)){
            return res.status(400).json({
                ok: false,
                message: 'No tienes permisos para actualizar la contraseña',
            });
        }

        connection.query('SELECT Nombre, Contraseña FROM centro_escolar WHERE ID_Centro = ?', [id], (error, datos) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al buscar el Centro"});
            } else if (datos.affectedRows === 0) {
                reject({ statusCode: 404, message: "Centro no encontrado"});
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

                connection.query('UPDATE centro_escolar SET Contraseña = ? WHERE ID_Centro = ?', [newPwd, id], (setError, setResults) => {
                    if (setError) {
                        reject({ statusCode: 500, message: "Error al cambiar la contraseña"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'Contraseña actualizada de Centro'
                            })
                        );
                    }
                })
            }
        });
    });
};


const deleteCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Centro;
        connection.query('SELECT * FROM centro_escolar WHERE ID_Centro = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al buscar el centro"});
            }else if(rows.length === 0){
                reject({ statusCode: 404, message: "Centro no encontrado" });
            }else{
                // Eliminar alumnos de clases pertenecientes a este centro
                connection.query('DELETE alumno FROM alumno INNER JOIN clase ON alumno.ID_Clase = clase.ID_Clase WHERE clase.ID_Centro = ?', [id], (error) => {
                    if (error) {
                        console.log(error);
                        return reject({ statusCode: 500, message: "Error al eliminar alumnos del centro" });
                    }
                    // Eliminar profesores del centro
                    connection.query('DELETE FROM profesor WHERE ID_Centro = ?', [id], (error) => {
                        if (error) {
                            console.log(error);
                            return reject({ statusCode: 500, message: "Error al eliminar profesores del centro" });
                        }
                        // Eliminar clases del centro
                        connection.query('DELETE FROM clase WHERE ID_Centro = ?', [id], (error) => {
                            if (error) {
                                console.log(error);
                                return reject({ statusCode: 500, message: "Error al eliminar clases del centro" });
                            }
                            // Finalmente, eliminar el centro
                            connection.query('DELETE FROM centro_escolar WHERE ID_Centro = ?', [id], (error) => {
                                if (error) {
                                    console.log(error);
                                    return reject({ statusCode: 500, message: "Error al eliminar el centro" });
                                } else {
                                    resolve(res.json({
                                        ok: true,
                                        msg: 'Centro, clases, profesores y alumnos eliminados correctamente'
                                    }));
                                }
                            });
                        });
                    });
                });
            }
        });
    });
};


module.exports = { getCentros, createCentro, updateCentro, deleteCentro, updateCentroPwd };