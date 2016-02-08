exec {"apt-update":
	command => "/usr/bin/apt-get update"
}

package { ['mysql-server']:
	ensure => installed,
	require => Exec["apt-update"]
}

service { 'mysql':
	enable      => true,
	ensure      => running,
	hasrestart => true,
	hasstatus  => true,
	require    => Package["mysql-server"],
}

exec { 'database casadocodigo_nodejs':
	command      => 'mysqladmin -u root create casadocodigo_nodejs',
	path        => '/usr/bin',
	unless     => "mysql -u root casadocodigo_nodejs",
	require => Service["mysql"],
}

exec { 'database casadocodigo_nodejs_test':
	command      => 'mysqladmin -u root create casadocodigo_nodejs_test',
	path        => '/usr/bin',
	unless     => "mysql -u root casadocodigo_nodejs_test",
	require => Service["mysql"],
}

exec { 'mysql-address':
	command      => 'sudo sed -i "s/^bind-address/#bind-address/" /etc/mysql/my.cnf',
	path        => '/usr/bin',
	notify		=> Service['mysql'],
}

exec { "mysql-rede" :
    command => "mysql -uroot -e \"GRANT ALL ON *.* TO 'root'@'%' IDENTIFIED BY '123' WITH GRANT OPTION;\"",
    path => "/usr/bin",
    require => Exec["mysql-address"]
}

exec { "mysql-flush" :
    command => "mysql -uroot -e \"FLUSH PRIVILEGES;\"",
    path => "/usr/bin",
    require => [Exec["mysql-rede"], Service['mysql']],
}


exec { 'import database':
	command     => 'mysql -uroot -D casadocodigo_nodejs < /vagrant/cria-base.sql',
	path        => '/usr/bin:/usr/sbin',
	unless		=> 'mysql -uroot -e \"select * from livros\"',
	require		=> Exec['mysql-flush']
}

exec { 'import database_test':
	command     => 'mysql -uroot -D casadocodigo_nodejs_test < /vagrant/cria-base.sql',
	path        => '/usr/bin:/usr/sbin',
	unless		=> 'mysql -uroot -e \"select * from livros\"',
	require		=> Exec['mysql-flush']
}