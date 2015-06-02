var Hapi = require('hapi'),
    Good = require('good'),
    server = new Hapi.Server();

server.connection({ port: 8000 });

server.register([
    {
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
    },
    {register: require('hapi-auth-basic')},
    {register: require('./server/auth-strategy.js')},
    {register: require('./server/routes/index.js')}
], function (err) {
    if (err) {
        throw err; // Что то плохое случилось при загрузке плагина
    }

    // Стартуем сервер
    server.start(function () {
        console.log('Server running at:', server.info.uri);
    });
});

