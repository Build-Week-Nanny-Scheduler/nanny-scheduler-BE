const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require('../users/usersModel.js');
const secrets = require('../config/secrets.js');
const { validateUser } = require('../users/usersHelpers.js');

// registers new user

router.post('/register', (req,res) => {
    let user = req.body;
    const validateResult = validateUser(user);

    if(validateResult.isSuccessful==true){
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
        .then(saved => {
            res.status(201),json(saved);
        })
        .catch(error => {
            res.status(400).json(error)
        })
    } else {
        res.status(400).json({
            message: 'Invalid information about the user',
            error: validateResult.error
        })
    }
});

// allows users to login with token

router.post('/login', (req, res) => {
    const validateResult = validateUser(req.body)

    if(!validateResult.isSuccessful){
        res.status(400).json({
            message:validateResult.error
        });
        return;
    }

    let { username, password } = req.body;

    Users.findBy({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user,password)){
            const token = getJwtToken(user.username)

            res.status(200).json({
                message:`Welcome ${username}!`,
                token
            })
        } else {
            res.status(401).json({
                message:'Invalid credentials'
            })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
});

// assigns a token to each user

function getJwtToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.JWT_SECRET, options)
};

module.exports = router;