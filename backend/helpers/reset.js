const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { resetAparicionAmbitos } = require('../controllers/alumnos');

const ultimaEjecucionPath = path.join(__dirname, 'ultimaEjecucion.txt');

// Asegúrate de que el archivo exista al inicio
if (!fs.existsSync(ultimaEjecucionPath)) {
  fs.writeFileSync(ultimaEjecucionPath, new Date().toISOString());
}

cron.schedule('0 3 * * *', async () => {
  let ultimaEjecucion;
  try {
    ultimaEjecucion = new Date(fs.readFileSync(ultimaEjecucionPath, 'utf8'));
  } catch (error) {
    console.error("Error al leer el archivo de última ejecución:", error);
    ultimaEjecucion = new Date();
    return;
  }

  const ahora = new Date();
  const diferenciaDias = Math.floor((ahora - ultimaEjecucion) / (1000 * 60 * 60 * 24));

  if (diferenciaDias <= 21) {
    console.log("Todavía no han pasado 3 semanas");
  }

  if (diferenciaDias >= 21) { // 3 semanas
    console.log("Ejecutando tarea para resetear AparicionAmbitos...");
    await resetAparicionAmbitos();
    console.log("Tarea completada.");
    try {
      fs.writeFileSync(ultimaEjecucionPath, ahora.toISOString());
    } catch (error) {
      console.error("Error al escribir en el archivo de última ejecución:", error);
    }
  }
}, {
  scheduled: true,
  timezone: "Europe/Madrid"
});
