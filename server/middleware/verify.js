const User = require('../models/user')

module.exports = {
    verifyRole : function (req, res, next) {
     const decoded = verify(req.headers.token)
      User.findById({_id : req.authenticatedUser.id})
      .then(found => {
          if (found.role == decoded.role) next()
          else {
              res.status(401).json({message : 'Not authorzied to conduct action'})
          }
      }) 
      .catch(err => {
          res.status(400).json(err)
      }) 
    }
}