const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    /*
    Here we are checking if the token is from Google or not 
    that means if we are signing in with the credentials provided from google sign in
    */
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader)
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication is required' })
        }
        const token = authHeader.replace('Bearer ', '')
        const isCustomAuth = token.length < 500;
        let decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Authentication is required' })
    }
}

module.exports = auth