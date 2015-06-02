var Bcrypt = require('bcrypt');

var users = {
    admin: {
        username: 'admin',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',
        name: 'Admin',
        id: '123'
    }
};

var validate = function (username, password, callback) {
    var user = users[username];
    if(!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, {id: user.id, name: user.name});
    })
};

exports.register = function (server, options, next) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
    next();
};

exports.register.attributes = {
    name: 'auth-strategy'
};