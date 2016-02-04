var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// associa a variavel para o express resolver
// em outras partes
app.set('io', io);

http.listen(3000, function(){
    console.log("Servidor rodando");
});