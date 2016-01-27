module.exports = function(app) {
	app.get('/produtos', function(req, res){
		var connection = app.infra.connectionFactory();
		// cria um novo contexto de uso 'this'
		var produtoBanco = new app.infra.produtosDAO(connection);

		produtoBanco.lista(function(err, results){
			res.render("produtos/lista", {lista: results});
		});
	});
}