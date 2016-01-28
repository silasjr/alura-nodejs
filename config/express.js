var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');


module.exports = function(argument) {
	
	var app = express();

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	// recebe funcoes que serao utilizadas a cada request
	// seguindo a ordem
	// middleware -> no mundo nodejs
	app.use(bodyParser.urlencoded({extended: true}));

	// a ordem de carregamento influencia
	// ja carrega o modulo e invoca o objeto
	load('routes', {cwd: 'app'})
		.then('infra')
	.into(app);

	return app;
}