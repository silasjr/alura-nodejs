var http = require('http');

var config = {
	hostname: '192.168.50.10',
	port: 3000,
	path: '/produtos',
	method: 'post',
	headers: {
		'Accept':'application/json',
		'Content-type': 'application/json'
	}
};

var client = http.request(config, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log('Body: '+body);
	});
});

var produto = {
	titulo: 'Mysql na pratica',
	preco: 85.98,
	autor: 'José Silas'
};

client.end(JSON.stringify(produto));