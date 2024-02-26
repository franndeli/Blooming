// const { dbConnection } = require('../database/configdb');
// const connection = dbConnection();
// const bcrypt = require('bcryptjs');
// const { generarJWT } = require('../helpers/jwt');
// const jwt = require('jsonwebtoken');

// const token = async(req, res) => {
//     const token = req.headers['x-token'];

//     if (!token) {
//         return res.status(401).json({
//             ok: false,
//             msg: 'No hay token en la petición'
//         });
//     }

//     try {
//         const { ID, Rol } = jwt.verify(token, process.env.JWTSECRET);

//         const usuario = await buscarUsuarioPorIDyRol(ID, Rol);

//         if (!usuario) {
//             return res.status(401).json({
//                 ok: false,
//                 msg: 'Token no válido - usuario no encontrado o rol cambiado'
//             });
//         }
//         const nrol = usuario.Rol;
//         // Aquí utilizamo  s ID y Rol directamente
//         const nuevotoken = await generarJWT(usuario);

//         return res.json({
//             ok: true,
//             msg: 'Token válido',
//             rol: nrol,
//             id: usuario.ID,
//             token: nuevotoken
//         });

//     } catch (err) {
//         return res.status(401).json({
//             ok: false,
//             msg: 'Token no válido',
//             error: err.message
//         });
//     }
// }

// const login = async (req, res) => {
//     const { Usuario, Contraseña } = req.body;

//     try {
//         const usuario = await buscarUsuario(Usuario);
//         if (!usuario) {
//             return res.status(400).json({
//                 ok: false,
//                 message: 'Usuario o contraseña incorrectos',
//                 token: ''
//             });
//         }

//         // Comprobar si el rol almacenado coincide con el esperado
//         if (usuario.Rol !== usuario.RolEsperado) {
//             return res.status(400).json({
//                 ok: false,
//                 message: `Rol no autorizado: se esperaba ${usuario.RolEsperado}`,
//                 token: ''
//             });
//         }

//         const validPassword = bcrypt.compareSync(Contraseña, usuario.Contraseña);
//         if (!validPassword) {
//             return res.status(400).json({
//                 ok: false,
//                 message: 'Usuario o contraseña incorrectos',
//                 token: ''
//             });
//         }

//         const { token, userID } = await generarJWT(usuario);
//         console.log(usuario);
//         res.json({
//             ok: true,
//             message: `login ${usuario.Rol}`,
//             rol: usuario.Rol,
//             id: userID,
//             token
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             message: 'Error en login',
//             token: ''
//         });
//     }
// };

// async function buscarUsuario(usuario) {
//     const tablas = [
//         { nombre: 'alumno', campoUsuario: 'Usuario', rolEsperado: 'Alumno' },
//         { nombre: 'profesor', campoUsuario: 'Email', rolEsperado: 'Profesor' },
//         { nombre: 'centro', campoUsuario: 'Email', rolEsperado: 'Centro' },
//         { nombre: 'admin', campoUsuario: 'Email', rolEsperado: 'Admin' }
//     ];

//     for (const tabla of tablas) {
//         const query = `SELECT *, ? as RolEsperado FROM ${tabla.nombre} WHERE ${tabla.campoUsuario} = ?`;
//         try {
//             const results = await consultaAsync(query, [tabla.rolEsperado, usuario]);
//             if (results && results.length > 0) {
//                 return results[0];
//             }
//         } catch (error) {
//             console.error(`Error en la consulta a la tabla ${tabla.nombre}:`, error);
//         }
//     }
//     return null;
// }

// function consultaAsync(query, params) {
//     return new Promise((resolve, reject) => {
//         connection.query(query, params, (error, results, fields) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// }

// async function buscarUsuarioPorIDyRol(id, rolEsperado) {
//     const tablaInfo = obtenerTablaPorRol(rolEsperado);
//     if (!tablaInfo) return null;

//     const query = `SELECT * FROM ${tablaInfo.nombre} WHERE ${tablaInfo.campoID} = ? AND Rol = ?`;
//     try {
//         const results = await consultaAsync(query, [id, rolEsperado]);
//         if (results && results.length > 0) {
//             return results[0];
//         }
//     } catch (error) {
//         console.error(`Error en la consulta a la tabla ${tablaInfo.nombre}:`, error);
//     }
//     return null;
// }

// function obtenerTablaPorRol(rol) {
//     switch (rol) {
//         case 'Alumno': return { nombre: 'alumno', campoID: 'ID_Alumno' };
//         case 'Profesor': return { nombre: 'profesor', campoID: 'ID_Profesor' };
//         case 'Centro': return { nombre: 'centro', campoID: 'ID_Centro' };
//         case 'Admin': return { nombre: 'admin', campoID: 'ID_Admin' };
//         default: return null;
//     }
// }



// module.exports = { login, token };