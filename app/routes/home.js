module.exports = function(app) {
	app.get('/', function(req, res){
				var connection = app.infra.connectionFactory();
		// cria um novo contexto de uso 'this'
		var produtoDAO = new app.infra.ProdutosDAO(connection);

		produtoDAO.lista(function(err, results){
			res.render('home/index', {livros: results});
		});

		connection.end();
	});
}