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