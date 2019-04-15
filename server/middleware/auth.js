const jwt =  require ('jsonwebtoken')
module.exports = {
    authenticate : function (req,res, next) {
        // console.log(req.headers.token, '????');
        
        if (req.headers.token){
            try {
                const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
                req.authenticatedUser = decoded
                next()
            }
            catch (err) {
                res.status(401).json({message : 'Unauthenticated user'})
            }
        } else {
            res.status(401).json({message : 'Unauthenticated user'})

        }
    }
}