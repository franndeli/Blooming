// const { dbConnection } = require('../database/configdb');
// const connection = dbConnection();

// const Pregunta = require('../models/pregunta');

// const getPreguntas = (req, res) => {
//     const tam = Number(process.env.TAMPORPAG);
//     const desde = Number(req.query.desde) || 0;

//     return new Promise(function (resolve, reject) {
//         let query = 'SELECT pregunta.* FROM pregunta';
//         let conditions = [];
//         let values = [];
//         let validParams = ['ID_Pregunta'];

//         let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

//         if (!isValidQuery) {
//             return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Opciones respuesta" });
//         }

//         if(req.query.ID_Pregunta){
//             conditions.push("pregunta.ID_Pregunta = ?");
//             values.push(req.query.ID_Pregunta);
//         }

//         if(conditions.length > 0){
//             query += ' WHERE ' + conditions.join(' AND ');
//         }

//         connection.query(query, values, (error, results) => {
//             if (error) {
//                 reject({ statusCode: 500, message: "Error al obtener las preguntas"});
//             } else{
//                 const preguntas = results.map(row => {
//                     const pregunta = new Pregunta();
//                     Object.assign(pregunta, row);
//                     return pregunta.toJSON();
//                 });
//                 resolve(
//                     res.json({
//                         ok: true,
//                         msg: 'getPregunta',
//                         preguntas
//                     })
//                 );
//             }
//         });
//     })
// } 


// const createPregunta = (req,res) => {
//     return new Promise(function(resolve, reject) {
//         const { ID_Pregunta } = req.body;

//         // Primero verificar si ya existe una pregunta con el mismo ID_Pregunta
//         connection.query('SELECT * FROM opciones WHERE ID_Pregunta = ?', [ID_Pregunta], (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return reject({ statusCode: 500, message: "Error al verificar si existe la pregunta"});
//             }

//             if (results.length > 0) {
//                 // Si ya existe una pregunta con el mismo ID_Pregunta, rechazar la creación
//                 return reject({ statusCode: 400, message: "Ya existe esta pregunta"});
//             }

//             // Si no existe, proceder con la creación de la nueva pregunta
//             connection.query('INSERT INTO pregunta SET ?', [req.body], (error, results) => {
//                 if (error) {
//                     console.log(error);
//                     reject({ statusCode: 500, message: "Error al crear la pregunta"});
//                 } else {
//                     resolve(res.json({
//                         ok: true,
//                         msg: 'Pregunta creada exitosamente'
//                     }));
//                 }
//             });
//         });
//     });
// }


// const updatePregunta = (req, res) => {
//     return new Promise(function(resolve, reject) {
//         const id = req.params.ID_Pregunta;
//         connection.query('SELECT * FROM pregunta WHERE ID_Pregunta = ?', [id], (error, rows) => {
//             if(error){
//                 reject({ statusCode: 500, message: "Error al actualizar la pregunta"});
//             }else{
//                 if(rows.length === 0){
//                     reject({ statusCode: 404, message: "Pregunta no encontrada" });
//                 }else{
//                     connection.query('UPDATE pregunta SET ? WHERE ID_Pregunta = ?', [req.body, id], (error, results) => {
//                         if (error) {
//                             console.log(error);
//                             return;
//                         }else{
//                             resolve(
//                                 res.json({
//                                     ok: true,
//                                     msg: 'updatePregunta'
//                                 })
//                             );
//                         }
//                     });
//                 }
//             }
//         });
//     });
// }


// const deletePregunta = (req, res) => {
//     return new Promise(function(resolve, reject) {
//         const id = req.params.ID_Pregunta;
        
//         // Primero verificar si la opción de respuesta existe
//         connection.query('SELECT * FROM pregunta WHERE ID_Pregunta = ?', [id], (error, rows) => {
//             if (error) {
//                 reject({ statusCode: 500, message: "Error al eliminar la pregunta"});
//             } else {
//                 if (rows.length === 0) {
//                     // Si la pregunta no existe
//                     reject({ statusCode: 404, message: "Pregunta no encontrada" });
//                 } else {
//                     // Si la pregunta existe, proceder con la eliminación
//                     connection.query('DELETE FROM pregunta WHERE ID_Pregunta = ?', [id], (error, results) => {
//                         if (error) {
//                             console.log(error);
//                             reject({ statusCode: 500, message: "Error al eliminar la pregunta"});
//                         } else {
//                             resolve(res.json({
//                                 ok: true,
//                                 msg: 'Pregunta eliminada',
//                                 id
//                             }));
//                         }
//                     });
//                 }
//             }
//         });
//     });
// };


// module.exports = { getPreguntas, createPregunta, updatePregunta, deletePregunta };