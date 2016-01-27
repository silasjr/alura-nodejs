var mysql = require('mysql');

module.exports = function () {
	return mysql.createConnection({
			host: '192.168.10.10',
			user: 'root',
			password: '123',
			database: 'casadocodigo_nodejs'
		});
}