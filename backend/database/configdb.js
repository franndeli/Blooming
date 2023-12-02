const mysql = require('mysql');

const dbConnection = () => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'blooming'
    });

    connection.connect((err) => {
        if (err) {
            console.log(err);
            throw new Error('Error al conectar a la BD');
        }
        //console.log('Todo perfe');
    });

    return connection;
}

module.exports = { dbConnection };