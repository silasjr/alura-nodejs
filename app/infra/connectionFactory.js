var mysql = require('mysql');

//wrapper -> funcao que embrulha a criacao da conexao
function createDBconnection() {
	return mysql.createConnection({
			host: '192.168.10.10',
			user: 'root',
			password: '123',
			database: 'casadocodigo_nodejs'
	});
}

module.exports = function() {
	return createDBconnection;
}