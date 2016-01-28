module.exports = function(app) {

	var listProduto = function(req, res){
		var connection = app.infra.connectionFactory();
		// cria um novo contexto de uso 'this'
		var produtoDAO = new app.infra.ProdutosDAO(connection);

		produtoDAO.lista(function(err, results){
			res.render("produtos/lista", {lista: results});
		});

		connection.end();
	};

	app.get('/produtos', listProduto);

	app.get('/produtos/form', function(req, res){
		res.render("produtos/form");
	});

	app.post('/produtos', function(req, res){

		var produto = req.body;
		console.log(produto);

		var connection = app.infra.connectionFactory();
		// cria um novo contexto de uso 'this'
		var produtoDAO = new app.infra.ProdutosDAO(connection);
		produtoDAO.salva(produto, function(error, result){
			res.redirect("/produtos");
		});
		connection.end();
	});
}