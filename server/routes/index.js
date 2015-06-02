exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('Hello, world!');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/{name}',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('Hello, ' + encodeURIComponent(request.params.name) + '|');
            }
        }
    });
    next();
};

exports.register.attributes = {
    name: 'base'
};