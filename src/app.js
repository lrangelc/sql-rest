const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


//setting
//------------------------------------->
app.set('port', process.env.PORT || 3000);
app.set('json spaces',4);

app.listen(app.get('port'), app_ready);
/*
app.listen(app.get('port'), () => {
    console.log('server on port: ' + app.get('port'));
});
*/
//setting
//-------------------------------------<


/*
son funciones que se ejecuta cada vez que se recibe
una peticion
*/
//middlewares
//------------------------------------->
app.use(morgan('dev'));
app.use(bodyParser.json());
//middlewares
//-------------------------------------<


/*
rutas del servidor
*/
//routes
//------------------------------------->
require('./routes/usuarioRoutes')(app);
//routes
//-------------------------------------<


function app_ready()
{
    console.log('Server on port: ' + app.get('port'));
}