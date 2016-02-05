var http = require('http');
describe('#ProdutosController', function(){

	it('#listagem json', function(funcaoFinalizacao){
		var config = {
			hostname: '192.168.50.10',
			port: 3000,
			path: '/produtos',
			headers: {
				'Accept':'application/json'
			}
		};

		http.get(config, function(res){
			console.log(res.statusCode == 200);
			console.log(res.headers['content-type'] == 'application/json; charset=utf-8');

			funcaoFinalizacao();
		});
	});
});