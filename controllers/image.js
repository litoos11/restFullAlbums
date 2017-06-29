'use strict'

const Image = require('../models/image'),
			Album = require('../models/album'),
			path = require('path'),
			fs = require('fs');

// function pruebaImage (req, res) {
// 	res.status(200).send({message: 'Pruebas de controlador de imagenes'});
// }

function getImage (req, res) {
	let imageId = req.params.id;

	Image.findById(imageId, (err, image)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición :-('});
		}else{
			if(!image){
				res.status(404).send({message: 'No existe la imagen :-('});
			}else{
				Album.populate(image, {path: 'album'}, (err, image)=>{
					if(err){
						res.status(500).send({message: 'Error en la petición :-('});
					}else{
						res.status(200).send({image});						
					}
				})
			}
		}
	})	
}


function getImages (req, res) {
	let albumId = req.params.album;

	if(!albumId){
		//Sacar todas la imagenes de la base de datos
		var find = Image.find({}).sort('title');
	}else{
		//Sacar todas la imganes asociadas a ese id
		var find = Image.find({album: albumId}).sort('title');
	}

	find.exec((err, images)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición :-('});
		}else{
			if(!images){
				res.status(404).send({message: 'No hay Imagenes en este album :-('});
			}else{
				Album.populate(images, {path: 'album'}, (err, images)=>{
					if(err){
						res.status(500).send({message: 'Error en la petición :-('});
					}else{
						res.status(200).send({images});						
					}
				})
			}
		}
	})
}


function saveImage (req, res) {
	let image = new Image();
	let params = req.body;

	image.title = params.title;
	image.picture  = null;
	image.album = params.album;

	image.save((err, imageStored)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición :-('});
		}else{
			if(!imageStored){
				res.status(404).send({message: 'No se ha guardado la imagen :-('});
			}else{
				res.status(200).send({image: imageStored});
			}
		}
	})
}


function updateImage (req, res) {
	let imageId = req.params.id;
	let update = req.body;

	Image.findByIdAndUpdate(imageId, update, (err, imageUpdate)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición :-('});
		}else{
			if(!imageUpdate){
				res.status(404).send({message: 'No pudo actualizar la imagen :-('});
			}else{
				res.status(200).send({image: imageUpdate});
			}
		}
	})
}


function deleteImage (req, res) {
	let imageId = req.params.id;

	Image.findByIdAndRemove(imageId, (err, imageRemoved)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición :-('});
		}else{
			if(!imageRemoved){
				res.status(404).send({message: 'No pudo eliminar la imagen :-('});
			}else{
				res.status(200).send({image: imageRemoved});
			}
		}
	})
}


function uploadImage (req, res) {
	let imageId = req.params.id,
			fileName = 'No subido...';

	if(req.files){
		let filePath = req.files.image.path,
				fileSplit = filePath.split('/'),
				fileName = fileSplit[1];

		console.log(fileName);
		console.log(filePath);
		Image.findByIdAndUpdate(imageId, {picture: fileName}, (err, imageUpdate)=>{
			if(err){
				res.status(500).send({message: 'Error en la petición :-('});
			}else{
				if(!imageUpdate){
					res.status(404).send({message: 'No pudo actualizar la imagen :-('});
				}else{
					res.status(200).send({image: imageUpdate});
				}
			}
		})
	}else{
		res.status(200).send({message: 'No ha subido ninguna imagen :-('});
	}
}

function getImageFile (req, res) {
	let imageFile = req.params.imageFile;

	fs.exists(`./uploads/${imageFile}`, (exists)=>{
		console.log(exists)
		if(exists){
			res.sendFile(path.resolve(`./uploads/${imageFile}`));
		}else{
			res.status(200).send({message: 'No existe la imagen :-('});	
		}
	})

}


module.exports = {
	// pruebaImage,
	getImage,
	saveImage,
	getImages,
	updateImage,
	deleteImage,
	uploadImage,
	getImageFile
}