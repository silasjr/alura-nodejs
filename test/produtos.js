var express = require('../config/express')();
var request = require('supertest')(express);
describe('#ProdutosController', function(){
	//TODO pesquisar sobre node-databse-cleaner
	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		conn.query('delete from livros', function(ex, result){
			if (!ex) {
				done();
			}	
		});
	});

	it('#listagem json', function(done){
		request.get('/produtos')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('#cadastro de novo produto com dados invalidos', function(done){
		var livro = {titulo: '', preco: 12, autor: 'silas jr'}
		request.post('/produtos')
			.send(livro)
				.expect(400, done);
	});

	it('#cadastro de novo produto com dados validos', function(done){
		var livro = {titulo: 'Livro teste', preco: 12, autor: 'silas jr'}
		request.post('/produtos')
			.send(livro)
				.expect(302, done);
	});

});