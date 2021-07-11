'use strict';

const express = require( 'express' );
const morgan = require( 'morgan' );
const bodyParser = require('body-parser');

const app = express();
//Configuraciones
app.set('port', process.env.PORT || 3000)
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rutas
app.use(require('../routes/index'));
app.use( '/api/login' ,require('../routes/login'));
app.use( '/api/register' ,require('../routes/register'));
app.use( '/api/update', require('../routes/update'));
app.use( '/api/list', require('../routes/listInfoUser'));
app.use( '/api/logout', require('../routes/logout'));

//Start Servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en puerto ${app.get('port')}`)
});