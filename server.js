var http = require('http')
    ,app = require('./config/express'),
    cors = require('cors');

http.createServer(app).listen(3000, function() {
    console.log('Servidor iniciado: ' + this.address().port);
});

