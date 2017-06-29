'use strict'
var express = require('express'),
		ImageComtroller = require('../controllers/image'),
		api = express.Router(),
		multiPart = require('connect-multiparty'),
		multiPartMiddleware = multiPart({ uploadDir: './uploads' });

api
	// .get('/prueba-image', ImageComtroller.pruebaImage)
	.get('/image/:id', ImageComtroller.getImage)
	.get('/images/:album?', ImageComtroller.getImages)
	.post('/image', ImageComtroller.saveImage)
	.put('/image/:id', ImageComtroller.updateImage)
	.delete('/image/:id', ImageComtroller.deleteImage)
	.post('/upload-image/:id', multiPartMiddleware, ImageComtroller.uploadImage)
	.get('/get-image/:imageFile', multiPartMiddleware, ImageComtroller.getImageFile)


module.exports = api;