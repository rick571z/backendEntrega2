const router = require('express').Router();

const apiRadar = require('./api/radar');

router.use('/radar', apiRadar);

//exportar
module.exports = router;