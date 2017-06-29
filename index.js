'use strict'
var mongoose = require('mongoose'),
		app = require('./app'),
		port = process.env.PORT || 3002;

mongoose.connect('mongodb://localhost:27017/app_albums', (err, res)=>{
	if(err){
		throw err;
	}else{
		console.log('Base de datos funcinando correctamente...');

		app.listen(port, ()=>{
			console.log(`API RESTFULL de albums corriendo en http://localhost:${port}`);
		})
	}
})