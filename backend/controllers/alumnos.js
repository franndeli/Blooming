const { dbConnection } = require('../database/configdb');
const connection = dbConnection();
const hashPassword = require('../middleware/hashHelper');

const Alumno = require('../models/alumno');

const getAlumnos = (req, res) => {
    const tam = Number(process.env.TAMPORPAG);
    const desde = Number(req.query.desde) || 0;

    return new Promise(function(resolve, reject) {
        let query = 'SELECT alumno.*, clase.Nombre AS NomClase, centro_escolar.Nombre AS NomCentro FROM alumno LEFT JOIN clase ON alumno.ID_Clase = clase.ID_Clase LEFT JOIN centro_escolar ON alumno.ID_Centro = centro_escolar.ID_Centro';

        let conditions = [];
        let values = [];

        let validParams = ['ID_Alumno', 'Nombre', 'Apellidos', 'Usuario', 'Contraseña', 'FechaNacimiento', 'ID_Clase', 'ID_Centro', 'desde'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Alumnos" });
        }

        if(req.query.ID_Alumno){
            conditions.push("alumno.ID_Alumno = ?");
            values.push(req.query.ID_Alumno);
        }
        if(req.query.Nombre){
            conditions.push("alumno.Nombre LIKE ?");
            values.push(`${req.query.Nombre}%`);
        }
        if(req.query.Apellidos){
            conditions.push("alumno.Apellidos LIKE ?");
            values.push(`${req.query.Apellidos}%`);
        }
        if(req.query.Usuario){
            conditions.push("alumno.Usuario LIKE ?");
            values.push(`${req.query.Usuario}%`);
        }
        if(req.query.FechaNacimiento){
            conditions.push("alumno.FechaNacimiento = ?");
            values.push(req.query.FechaNacimiento);
        }
        if(req.query.ID_Clase){
            conditions.push("alumno.ID_Clase = ?");
            values.push(req.query.ID_Clase);
        }
        if(req.query.ID_Centro){
            conditions.push("alumno.ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ` LIMIT ${tam} OFFSET ${desde}`;

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el alumno"});
            } else {
                const alumnos = results.map(row => {
                    const alumno = new Alumno();
                    Object.assign(alumno, row);
                    alumno.ajustarFechas();
                    return alumno.toJSON();
                });
                resolve(res.json({
                    ok: true,
                    msg: 'getAlumnos',
                    alumnos
                }));
            }
        });
    });
}


function obtenerApellidos(apellidos) {
    const partes = apellidos.split(' ');

    // Obtener las partes individuales de los apellidos
    const apellido1 = partes[0] || '';
    const apellido2 = partes.length > 1 ? partes[1] : '';

    return { apellido1, apellido2 };
}

function generarUsuario(nombre, apellidos, id) {
    // Separar los apellidos
    const { apellido1, apellido2 } = obtenerApellidos(apellidos);

    // Obtener las iniciales del primer y segundo apellido
    const inicialApellido1 = apellido1.charAt(0).toLowerCase();
    const inicialApellido2 = apellido2.charAt(0).toLowerCase();

    //const numero = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

    // Crear el nombre de usuario concatenando los elementos
    const username = `${nombre.toLowerCase()}${inicialApellido1}${inicialApellido2}${id}`;

    return username;
}

const createAlumno = (req, res) => {
    return new Promise(function(resolve, reject) {
        const { Nombre, Apellidos, Contraseña, FechaNacimiento, ID_Clase } = req.body;

        // Primero, obtenemos el ID_Centro de la clase
        connection.query('SELECT ID_Centro FROM clase WHERE ID_Clase = ?', [ID_Clase], (error, claseResults) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el centro de la clase"});
            } else if (claseResults.length === 0) {
                reject({ statusCode: 404, message: "Clase no encontrada"});
            } else {
                const ID_Centro = claseResults[0].ID_Centro;

                // Hasheamos la contraseña para guardarla
                const hashedPassword = hashPassword(Contraseña);
                const newAlumno = { Nombre, Apellidos, Contraseña: hashedPassword, FechaNacimiento, ID_Clase, ID_Centro };

                connection.query('INSERT INTO alumno SET ?', [newAlumno], (insertError, insertResults) => {
                    if (insertError) {
                        reject({ statusCode: 500, message: "Error al crear el alumno"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'createAlumno',
                                id: insertResults.insertId
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

        if (req.body.Contraseña) {
            const hashedPassword = hashPassword(req.body.Contraseña);
            req.body.Contraseña = hashedPassword;
        }

        connection.query('UPDATE alumno SET ? WHERE ID_Alumno = ?', [req.body, id], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al actualizar el alumno"});
            } else if (results.affectedRows === 0) {
                // Ninguna fila fue afectada, es decir, no se encontró el alumno
                reject({ statusCode: 404, message: "Alumno no encontrado"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'updateAlumno',
                    id
                }));
            }
        });
    });
};

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

module.exports = { getAlumnos, createAlumno, updateAlumno, deleteAlumno };