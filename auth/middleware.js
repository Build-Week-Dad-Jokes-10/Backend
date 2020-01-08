const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'asdflasdlfl', (err, decodedToken) => {
            if(err) {
                res.status(401).josn({ message: 'Token not valid' });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'No Token Provided'})
    }
}