'use strict'

var Album = require('../models/album');

function getAlbum (req, res) {
	let albumId = req.params.id;

	Album.findById(albumId, (err, album)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!album){
				res.status(404).send({message: 'Error el album no existe !!!'});
			}else{
				res.status(200).send({album});				
			}
		}
	})
}

function getAlbums (req, res) {
	Album.find({}, (err, albums)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!albums){
				res.status(404).send({message: 'No hay albums !!!'});
			}else{
				res.status(200).send({albums});				
			}
		}
	})
}

function saveAlbum (req, res) {
	let album = new Album();
	let params = req.body;

	album.title = params.title;
	album.description = params.description;

	album.save((err, albumStored)=>{
		if(err){
			res.status(500).send({message: 'Error al guardar el Album'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'Error al guardar el Album!!!'});
			}else{
				res.status(200).send({album: albumStored});				
			}
		}
	})
}

function updateAlbum (req, res) {
	let albumId = req.params.id;
	let update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdate)=>{
		if(err){
			res.status(500).send({message: 'Error al actualizar el album'});
		}else{
			if(!albumUpdate){
				res.status(404).send({message: 'No se pudo actualizar el Album!!!'});
			}else{
				res.status(200).send({album: albumUpdate});				
			}
		}
	})
}

function deleteAlbum (req, res) {
	let albumId = req.params.id;

	Album.findByIdAndRemove(albumId, (err, albumDelete)=>{
		if(err){
			res.status(500).send({message: 'Error al borrar el album'});
		}else{
			if(!albumDelete){
				res.status(404).send({message: 'No se pudo eliminar el Album!!!'});
			}else{
				res.status(200).send({album: albumDelete});				
			}
		}
	})
}

module.exports = {
	getAlbum,
	getAlbums,
	saveAlbum,
	updateAlbum,
	deleteAlbum
}