'use strict'

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

const AlbumSchema = Schema({
		title: String,
		description: String
	});

module.exports = mongoose.model('Album', AlbumSchema);