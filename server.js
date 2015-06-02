var Hapi = require('hapi'),
    Good = require('good'),
    server = new Hapi.Server();

server.connection({ port: 8000 });

// добавляем роултер
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '|')
    }
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // Что то плохое случилось при загрузке плагина
    }

    // Стартуем сервер
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});

