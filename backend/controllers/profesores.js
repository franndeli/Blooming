const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const hashPassword = require('../middleware/hashHelper');

const Profesor = require('../models/profesor');

const getProfesores = (req, res) => {
    const tam = Number(process.env.TAMPORPAG);
    const desde = Number(req.query.desde) || 0;

    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM profesor';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Profesor', 'Nombre', 'Apellidos', 'Email', 'Contraseña', 'ID_Centro', 'desde'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Profesores" });
        }

        if(req.query.ID_Profesor){
            conditions.push("ID_Profesor = ?");
            values.push(req.query.ID_Profesor);
        }
        if(req.query.Nombre){
            conditions.push("Nombre LIKE ?");
            values.push(`${req.query.Nombre}%`);
        }
        if(req.query.Apellido){
            conditions.push("Apellidos LIKE ?");
            values.push(`${req.query.Apellidos}%`);
        }
        if(req.query.Email){
            conditions.push("Email LIKE ?");
            values.push(`${req.query.Email}%`);
        }
        if(req.query.Contraseña){
            conditions.push("Contraseña = ?");
            values.push(req.query.Contraseña);
        }
        if(req.query.ID_Clase){
            conditions.push("ID_Clase = ?");
            values.push(req.query.ID_Clase);
        }
        if(req.query.ID_Centro){
            conditions.push("ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ` LIMIT ${tam} OFFSET ${desde}`;

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el profesor"});
            } else {
                const profesores = results.map(row => {
                    const profesor = new Profesor();
                    Object.assign(profesor, row);
                    return profesor.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getProfesores',
                        profesores
                    })
                );
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
                reject({ statusCode: 400, message: "El email de este profesor ya existe en el centro especificado"});
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

        //Comprobamos si hay una contraseña en el update
        if(req.body.Contraseña){
            const hashedPassword = hashPassword(req.body.Contraseña);
            
            req.body.Contraseña = hashedPassword;

            actualizarProfesor();
        } else{

            actualizarProfesor();
        }

        //Hacemos el update
        function actualizarProfesor() {
            connection.query('UPDATE profesor SET ? WHERE ID_Profesor = ?', [req.body, id], (error, results) => {
                if (error) {
                    reject({ statusCode: 500, message: "Error al actualizar el profesor"});
                } else {
                    resolve(
                        res.json({
                            ok: true,
                            msg: 'updateProfesor'
                        })
                    );
                }
            });
        }
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