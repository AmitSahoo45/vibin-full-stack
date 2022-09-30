const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = async (req, res, next) => {
    /*
    Here we are checking if the token is from Google or not 
    that means if we are signing in with the credentials provided from google sign in
    */
    try {
        const authHeader = req.headers.authorization
        console.log('Auth - 1')
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(401).json({ message: 'Authentication is required' })
        }
        console.log('Auth - 2')
        const token = authHeader.replace('Bearer ', '')
        const isCustomAuth = token.length < 500;
        let decodedData
        console.log('Auth - 3')
        
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET) 
            req.userId = decodedData?.id
            /*
            This is for the general auth 
            if the token length is less than 500 characters, then it means that the token is created from our backend 
            else it means that the token is created from google sign in
            */
           console.log('Auth - 4')
        } else {
            /*
            here we will be working with googles oauth token
            */
           //    decodedData = jwt.verify(token, process.env.GOOGLE_CLIENT_SECRET)
           decodedData = jwt.decode(token)
           req.userId = decodedData?.sub
           /*
           sub is google's name for a user id that differentiates evry dingle google user
           */
           console.log('Auth - 5')
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Authentication is required' })
    }
}

module.exports = auth