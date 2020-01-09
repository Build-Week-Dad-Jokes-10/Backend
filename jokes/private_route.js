
const secrets = require('../config/secrets')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if(authorization){
        jwt.verify(authorization, secrets.jwtSecret, (err, decodedToken)=>{
            if(err){
                res.status(401).json({messege:'invalid token'})
            }else{                
                next()
            }
        })
    }else{
        res.status(403).json({messege:'Log in!'})

    }
}