const User = require('../models/user')

module.exports = {
    authadmin : function (req, res, next) {
      User.findById({_id : req.authenticatedUser.id})
      .then(found => {
          if (found.role == 'admin') next()
          else {
              res.status(401).json({message : 'Not authorzied to conduct action'})
          }
      }) 
      .catch(err => {
          res.status(400).json(err)
      }) 
    }
}