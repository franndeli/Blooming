const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const hashPassword = require('../middleware/hashHelper');

const Admin = require('../models/admin');

const getAdmins = (req, res) => {
    const tam = Number(process.env.TAMPORPAG);
    const desde = Number(req.query.desde) || 0;

    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM admin';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Admin', 'Nombre', 'Email', 'desde'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Admins" });
        }

        if(req.query.ID_Admin){
            conditions.push("ID_Admin = ?");
            values.push(req.query.ID_Admin);
        }
        if(req.query.Nombre){
            conditions.push("Nombre LIKE ?");
            values.push(`${req.query.Nombre}%`);
        }
        if(req.query.Email){
            conditions.push("Email LIKE ?");
            values.push(`${req.query.Email}%`);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ` LIMIT ${tam} OFFSET ${desde}`;

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el admin"});
            } else{
                const admins = results.map(row => {
                    const admin = new Admin();
                    Object.assign(admin, row);
                    return admin.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getAdmin',
                        admins
                    })
                );
            }
        });
    });
}


const createAdmin = (req, res) => {
    return new Promise(function(resolve, reject) {
        const email = req.body.Email;

        //Comprueba si el email ya existe
        connection.query('SELECT * FROM admin WHERE Email = ?', [email], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al verificar el email"});
            } else if (results.length > 0) {
                // Si se encuentra un Admin con el mismo email, rechaza la petición
                reject({ statusCode: 400, message: "El email ya existe en otro Admin"});
            } else {
                //Ciframos la contraseña antes de insertar
                const hashedPassword = hashPassword(req.body.Contraseña);
                const newAdmin = { ...req.body, Contraseña: hashedPassword };

                connection.query('INSERT INTO admin SET ?', [newAdmin], (insertError, insertResults) => {
                    if (insertError) {
                        reject({ statusCode: 500, message: "Error al crear el Admin"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'createAdmin',
                                newAdmin
                            })
                        );
                    }
                });
            }
        });
    });
};


const updateAdmin = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Admin;

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        connection.query('UPDATE admin SET ? WHERE ID_Admin = ?', [req.body, id], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al actualizar el Admin"});
            } else if (results.affectedRows === 0) {
                // Ninguna fila fue afectada, es decir, no se encontró el Admin
                reject({ statusCode: 404, message: "Admin no encontrado"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'updateAdmin',
                    id
                }));
            }
        });
    });
};

const deleteAdmin = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Admin;
        connection.query('SELECT * FROM admin WHERE ID_Admin = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al eliminar el Admin"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Admin no encontrado" });
                }else{
                    connection.query('DELETE FROM admin WHERE ID_Admin = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteAdmin'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getAdmins, createAdmin, updateAdmin, deleteAdmin };