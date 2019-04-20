const Cart = require('../models/cart')
console.log('ini kepake middlewae cart auth');
module.exports = {
    cartauth : function (req, res, next) {
        console.log('MASUK AUTH');
        
        let cartId = req.headers.cartid
        let userId = req.authenticatedUser.id
        // console.log(cartId, userId, 'apa kah ini????');
        
      Cart.findById({_id : cartId})
      .then(found => {
          if (!found) {
            res.status(404).json({message: 'Not found'})
          } else {
              if (found.userId == userId) next()
              else {
                  res.status(401).json({message : 'Not authorzied to conduct action'})
              }
          }
          
      }) 
      .catch(err => {
          res.status(400).json(err)
      }) 
    }
}