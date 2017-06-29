'use strict'
var express = require('express'),
		AlbumComtroller = require('../controllers/album'),
		api = express.Router();

api
	.get('/album/:id', AlbumComtroller.getAlbum)
	.get('/albums', AlbumComtroller.getAlbums)
	.post('/album', AlbumComtroller.saveAlbum)
	.put('/album/:id', AlbumComtroller.updateAlbum)
	.delete('/album/:id', AlbumComtroller.deleteAlbum)


module.exports = api;