const { dbConnection } = require('../database/configdb');
const connection = dbConnection();

const getCentros = (req, res) => {
    return new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM centro_escolar', (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener los centros"});
            }else{
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getCentros',
                        results
                    })
                );
            }
        });
    });
}

const getCentrosPorCriterio = (req, res) => {
    return new Promise(function(resolve, reject) {
        let query = 'SELECT * FROM centro_escolar';
        let conditions = [];
        let values = [];
        let validParams = ['ID_Centro', 'Nombre', 'Email', 'Localidad', 'Provincia', 'Calle', 'CP'];

        let isValidQuery = Object.keys(req.query).every(param => validParams.includes(param));

        if (!isValidQuery) {
            return reject({ statusCode: 400, message: "Parámetros de búsqueda no válidos en Centros" });
        }

        if(req.query.ID_Centro){
            conditions.push("ID_Centro = ?");
            values.push(req.query.ID_Centro);
        }
        if(req.query.Nombre){
            conditions.push("Nombre = ?");
            values.push(req.query.Nombre);
        }
        if(req.query.Email){
            conditions.push("Email = ?");
            values.push(req.query.Email);
        }
        if(req.query.Localidad){
            conditions.push("Localidad = ?");
            values.push(req.query.Localidad);
        }
        if(req.query.Provincia){
            conditions.push("Provincia = ?");
            values.push(req.query.Provincia);
        }
        if(req.query.Calle){
            conditions.push("Calle = ?");
            values.push(req.query.Calle);
        }
        if(req.query.CP){
            conditions.push("CP = ?");
            values.push(req.query.CP);
        }

        if(conditions.length > 0){
            query += ' WHERE ' + conditions.join(' AND ');
        }

        connection.query(query, values, (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al obtener el centro"});
            } else {
                resolve(
                    res.json({
                        ok: true,
                        msg: 'getCentroByCriteria',
                        results
                    })
                );
            }
        });
    });
}


const createCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        //Comprueba si el email ya existe
        const email = req.body.Email;
        connection.query('SELECT * FROM centro_escolar WHERE Email = ?', [email], (error, results) => {
            if (error) {
                reject({ statusCode: 500, message: "Error al verificar el email"});
            } else if (results.length > 0) {
                // Si se encuentra un centro con el mismo email, rechaza la petición
                reject({ statusCode: 400, message: "El email ya existe en otro centro"});
            } else {
                // Si no existe, procede con la inserción
                connection.query('INSERT INTO centro_escolar SET ?', [req.body], (insertError, insertResults) => {
                    if (insertError) {
                        reject({ statusCode: 500, message: "Error al crear el centro"});
                    } else {
                        resolve(
                            res.json({
                                ok: true,
                                msg: 'createCentro'
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
        connection.query('SELECT * FROM centro_escolar WHERE ID_Centro = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al actualizar el centro"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Centro no encontrado" });
                }else{
                    connection.query('UPDATE centro_escolar SET ? WHERE ID_Centro = ?', [req.body, id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'updateCentro'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

const deleteCentro = (req, res) => {
    return new Promise(function(resolve, reject) {
        const id = req.params.ID_Centro;
        connection.query('SELECT * FROM centro_escolar WHERE ID_Centro = ?', [id], (error, rows) => {
            if(error){
                reject({ statusCode: 500, message: "Error al eliminar el centro"});
            }else{
                if(rows.length === 0){
                    reject({ statusCode: 404, message: "Centro no encontrado" });
                }else{
                    connection.query('DELETE FROM centro_escolar WHERE ID_Centro = ?', [id], (error, results) => {
                        if (error) {
                            console.log(error);
                            return;
                        }else{
                            resolve(
                                res.json({
                                    ok: true,
                                    msg: 'deleteCentro'
                                })
                            );
                        }
                    });
                }
            }
        });
    });
}

module.exports = { getCentros, createCentro, updateCentro, deleteCentro, getCentrosPorCriterio };