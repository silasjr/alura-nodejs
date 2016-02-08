CREATE TABLE if not exists livros (
	id BIGINT NOT NULL AUTO_INCREMENT ,
	titulo varchar(100) NULL,
	preco double NULL,
	autor varchar(100) NULL,
	PRIMARY KEY(id)
);


INSERT INTO livros
(titulo, preco, autor)
VALUES('NodeJS And Express', 29.9, 'Silas'),
('JavaEE 7', 69.9, 'Silas'),
('MongoDB', 49.9, 'Silas'),
('Nodejs and Angularjs', 19.9, 'Silas'),
('Angularjs JEDI', 19.9, 'Silas'),
('Vagrant and Puppet', 39.9, 'Silas');