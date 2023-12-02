const { Router } = require('express');
const { getAlumnos } = require('../controllers/alumnos');

const router = Router();

router.get('/', getAlumnos );

module.exports = router;