var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(argument) {
	
	var app = express();

	//trata os recursos estaticos
	app.use(express.static('./app/public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	// recebe funcoes que serao utilizadas a cada request
	// seguindo a ordem
	// middleware -> no mundo nodejs
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	// a ordem de carregamento influencia
	// ja carrega o modulo e invoca o objeto
	load('routes', {cwd: 'app'})
		.then('infra')
	.into(app);

	return app;
}