const jwt =  require ('jsonwebtoken')
module.exports = {
    authenticate : function (req,res, next) {        
        if (req.headers.token) {
            try {        
                // console.log(req.headers.token, 'ini bener ada/????')               
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                req.authenticatedUser = decoded
                next()
            }
            catch (err) {
                // console.log(err, 'MASuK ERROR JWT GA');
                
                res.status(401).json({message : 'Unauthenticated user'})
            }
        } else {
            res.status(401).json({message : 'Unauthenticated user'})

        }
    }
}