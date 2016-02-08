var mysql = require('mysql');

//wrapper -> funcao que embrulha a criacao da conexao
function createDBconnection() {
	if (!process.env.NODE_ENV) {
		return mysql.createConnection({
				host: '192.168.10.10',
				user: 'root',
				password: '123',
				database: 'casadocodigo_nodejs'
		});
	}

	if (process.env.NODE_ENV == 'test') {
		return mysql.createConnection({
				host: '192.168.10.10',
				user: 'root',
				password: '123',
				database: 'casadocodigo_nodejs_test'
		});
	}
}

module.exports = function() {
	return createDBconnection;
}