module.exports = function(app) {

	var listProduto = function(req, res){
		var connection = app.infra.connectionFactory();
		// cria um novo contexto de uso 'this'
		var produtoDAO = new app.infra.ProdutosDAO(connection);

		produtoDAO.lista(function(err, results){
			res.format({
				html: function() {
					res.render("produtos/lista", {lista: results});		
				},
				json: function() {
					res.json(results);
				}
			});
			
		});

		connection.end();
	};

	app.get('/produtos', listProduto);

	app.get('/produtos/form', function(req, res){
		res.render("produtos/form", {errosValidacao: {}, produto: {}});
	});

	app.post('/produtos', function(req, res){

		var produto = req.body;
		
		// return validationChain
		req.assert('titulo', 'Título é obrigatório').notEmpty();
		req.assert('preco', 'Formato inválido').isFloat();

		var erros = req.validationErrors();
		if (erros) {

			res.format({
				html: function() {
					res.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});
				},
				json: function() {
					res.status(400).json(erros);
				}
			})
			
			return;
		}

		var connection = app.infra.connectionFactory();
		// cria um novo contexto de uso 'this'
		var produtoDAO = new app.infra.ProdutosDAO(connection);
		produtoDAO.salva(produto, function(error, result){
			res.redirect("/produtos");
		});
		connection.end();
	});
}