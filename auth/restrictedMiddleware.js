const jwt = require('jsonwebtoken');
const configSecret = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token){
        const secret = configSecret.JWT_SECRET;

        jwt.verify(token, secret, (err, decodedToken) => {
            if (err){
                res.status(401).json({
                    message:'Invalid Credentials'
                })
            } else {
                req.decodedJwt = decodedToken
                next();
            }
        });
    } else {
        res.status(400).json({
            message:'Please Enter a username and password'
        });
    }
};