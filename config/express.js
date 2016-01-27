var express = require('express');
var load = require('express-load');


module.exports = function(argument) {
	
	var app = express();

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	// a ordem de carregamento influencia
	// ja carrega o modulo e invoca o objeto
	load('routes', {cwd: 'app'})
		.then('infra')
	.into(app);

	return app;
}