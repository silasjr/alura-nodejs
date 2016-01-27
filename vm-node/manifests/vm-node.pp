exec{ "apt-update":
	command 	=> "/usr/bin/apt-get update"
}

package { 'curl':
	ensure => installed,
	require => [Exec['apt-update']],
}

exec { "install apt-nodejs": 
	command 	=> "curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -",
	path		=> '/usr/bin',
	require 	=> [Exec["apt-update"], Package['curl']],
}

package { ['nodejs']:
	ensure 		=> installed,
	require 	=> Exec["install apt-nodejs"]
}

exec { 'install nodemon':
	command     => 'sudo npm -g install nodemon',
	path        => '/usr/bin',
	require		=> [Package['nodejs']],	
}