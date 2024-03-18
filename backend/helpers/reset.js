const cron = require('node-cron');

const { resetAparicionAmbitos } = require('../controllers/alumnos');

cron.schedule('0 3 1 * *', async () => {
    console.log("Ejecutando tarea para resetear AparicionAmbitos...");
    await resetAparicionAmbitos();
    console.log("Tarea completada.");
}, {
  scheduled: true,
  timezone: "Europe/Madrid"
});