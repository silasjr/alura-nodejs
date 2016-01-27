var dbConnection = require('../infra/connectionFactory');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/produtos/view', function(req,res){
		res.render('produtos/view');
	});

	app.get('/produtos/form', function(req, res){
	    res.render('produtos/form');
	});

	app.get('/produtos', function(req, res){

		var connection = dbConnection();

		connection.query('select * from livros', function(err, results){
			res.render("produtos/lista", {lista: results});
		});

		connection.end();
	});
}