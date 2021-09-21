const express = require('express');

//gestionar petciones post
const bodyParser = require('body-parser');

const apiRouter = require('./router/api');

const app = express();

//configuraciones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('server running..!');
});