const Clase = require('./clase');
const Centro = require('./centro');
const Alumno = require('./alumno');
const Ambito = require('./ambito');
const Opcion = require('./opcion');
const Profesor = require('./profesor');
const Pregunta = require('./pregunta');

// Relaciones entre tablas Clase-Centro, obtener el nombre del Centro en la tabla Clase
Clase.belongsTo(Centro, { foreignKey: 'ID_Centro' });
Centro.hasMany(Clase, { foreignKey: 'ID_Centro' });

// Relaciones entre tablas Profesor-ClaseYCentro, obtener el nombre del Centro y Clase en la tabla Profesor
Profesor.belongsTo(Clase, { foreignKey: 'ID_Clase' });
Profesor.belongsTo(Centro, { foreignKey: 'ID_Centro' });
Clase.hasMany(Profesor, { foreignKey: 'ID_Clase' });
Centro.hasMany(Profesor, { foreignKey: 'ID_Centro' });

// Relaciones entre tablas Alumno-ClaseYCentro, obtener el nombre del Centro y Clase en la tabla Alumno
Alumno.belongsTo(Clase, { foreignKey: 'ID_Clase' });
Alumno.belongsTo(Centro, { foreignKey: 'ID_Centro' });
Clase.hasMany(Alumno, { foreignKey: 'ID_Clase' });
Centro.hasMany(Alumno, { foreignKey: 'ID_Centro' });

// Relaciones entre tablas Pregunta-Ambito, obtener el nombre del Ambito en la tabla Pregunta
Pregunta.belongsTo(Ambito, { foreignKey: 'ID_Ambito' });
Ambito.hasMany(Pregunta, { foreignKey: 'ID_Pregunta' });

// Relaciones entre tablas Opcion-PreguntayAmbito, obtener el nombre del Ambito y la Pregunta en la tabla Opcion
Opcion.belongsTo(Pregunta, { foreignKey: 'ID_Pregunta' });
Pregunta.hasMany(Opcion, { foreignKey: 'ID_Pregunta' });