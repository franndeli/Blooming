const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const Respuesta = require('../models/respuesta');

const getRespuestas = (req, res) => {
    const tam = Number(process.env.TAMPORPAG);
    const desde = Number(req.query.desde) || 0;

    return new Promise(function(resolve, reject) {
        let query = 'SELECT respuesta.ID_Respuesta, opciones_respuesta.TextoOpcion AS Respuesta, opciones_respuesta.Gravedad AS Gravedad, respuesta.ID_Alumno, pregunta.TextoPregunta AS ID_Pregunta, DATE_FORMAT(respuesta.FechaRespuesta, "%d-%m-%Y") AS Fecha, DATE_FORMAT(respuesta.FechaRespuesta, "%H:%i:%s") AS Hora, respuesta.ID_Sesion FROM respuesta ';
        query += 'INNER JOIN opciones_respuesta ON respuesta.Respuesta = opciones_respuesta.ID_Opcion ';
        query += 'INNER JOIN pregunta ON respuesta.ID_Pregunta = pregunta.ID_Pregunta';
        

        let conditions = [];
        let values = [];
        let validParams = ['ID_Respuesta', 'Respuesta', 'ID_Alumno', 'ID_Pregunta', 'ID_Sesion', 'FechaRespuesta'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Respuestas" });
        }

        if(req.query.ID_Respuesta){
            conditions.push("respuesta.ID_Respuesta = ?");
            values.push(req.query.ID_Respuesta);
        }
        if(req.query.Respuesta){
            conditions.push("respuesta.Respuesta = ?");
            values.push(req.query.Respuesta);
        }
        if(req.query.ID_Alumno){
            conditions.push("respuesta.ID_Alumno = ?");
            values.push(req.query.ID_Alumno);
        }
        if(req.query.ID_Pregunta){
            conditions.push("respuesta.ID_Pregunta = ?");
            values.push(req.query.ID_Pregunta);
        }
        if(req.query.FechaRespuesta){
            conditions.push("respuesta.FechaRespuesta = ?");
            values.push(req.query.FechaRespuesta);
        }
        if(req.query.ID_Sesion){
            conditions.push("respuesta.ID_Sesion = ?");
            values.push(req.query.ID_Sesion);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY respuesta.FechaRespuesta DESC';
        query += ` LIMIT ${tam} OFFSET ${desde}`;

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener la respuesta"});
            } else{
                const respuestas = results.map(row => {
                    const respuesta = new Respuesta();
                    Object.assign(respuesta, row);
                    return respuesta.toJSON();
                });
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getRespuesta',
                        respuestas
                    })
                );
            }
        });
    });
}

const createRespuesta = (req, res) => {
    return new Promise(function(resolve, reject) {
        const { Respuesta, ID_Alumno, ID_Pregunta, ID_Sesion } = req.body;

        const nuevaRespuesta = {
            Respuesta: Respuesta,
            ID_Alumno: ID_Alumno,
            ID_Pregunta: ID_Pregunta,
            ID_Sesion: ID_Sesion,
            FechaRespuesta: new Date() // Si quieres usar la fecha y hora actual
        };

        connection.query('INSERT INTO respuesta SET ?', [nuevaRespuesta], (error, results) => {
            if (error) {
                console.log(error);
                reject({ statusCode: 500, message: "Error al crear la respuesta"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'createRespuesta',
                    nuevaRespuesta
                }));
            }
        });
    });
};



const updateRespuesta = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Respuesta;
        connection.query('UPDATE respuesta SET ? WHERE ID_Respuesta = ?', [req.body, id], (error, results) => {
            if (error) {
                console.log(error);
                reject({ statusCode: 500, message: "Error al actualizar la respuesta"});
            } else if (results.affectedRows === 0) {
                reject({ statusCode: 404, message: "Respuesta no encontrada"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'updateRespuesta',
                    id
                }));
            }
        });
    });
};

const deleteRespuesta = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Respuesta;
        connection.query('DELETE FROM respuesta WHERE ID_Respuesta = ?', [id], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al eliminar la respuesta"});
            } else if (results.affectedRows === 0) {
                reject({ statusCode: 404, message: "Respuesta no encontrada"});
            } else {
                resolve(res.json({
                    ok: true,
                    msg: 'deleteRespuesta',
                    id
                }));
            }
        });
    });
};


module.exports = { getRespuestas, createRespuesta, updateRespuesta, deleteRespuesta };