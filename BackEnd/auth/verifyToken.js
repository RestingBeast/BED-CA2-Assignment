var jwt = require('jsonwebtoken');
var JWT_SECRET = require('../config');

function verifyToken(req, res, next) {
    console.log(req.headers);
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.includes('Bearer')) {
        let errData = {
            auth: 'false',
            message: 'Not authorized! ' +
                'Reason(No token found / Token has invalid syntax)'
        };
        return res.status(403).type('json').send(JSON.stringify(errData));
    } else {
        let token = authHeader.replace("Bearer ", "");
        let tokenConfig = {
            algorithms: ["HS256"]
        };
        jwt.verify(token, JWT_SECRET, tokenConfig, function (err, decodedToken) {
            if (err) {
                let errData = {
                    auth: 'false',
                    message: 'Not authorized! Reason(Invalid Token)'
                };

                return res.status(403).type('json').end(JSON.stringify(errData));
            } else {
                req.userid = decodedToken.id;
                req.role = decodedToken.role;
                next();
            }
        });
    }
}

module.exports = verifyToken;