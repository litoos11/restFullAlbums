'use strict'
var express = require('express'),
		bodyParser = require('body-parser'),
		app = express();

		// Cargar las rutas
var album_routes = require('./routes/album');
var image_routes = require('./routes/image');


app
	.use(bodyParser.urlencoded({extended: false}))
	.use(bodyParser.json());//{limit: '50mb'}

	// Configurar cabeceras
	
app.use((req, res, next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
})

	// rutas base
app
	.use('/api', album_routes)
	.use('/api', image_routes);
	
module.exports = app;