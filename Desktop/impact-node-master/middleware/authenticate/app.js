const User = require('../../controllers/user/index');
const db = require('../../db/index');
const passPortSocialLogin = require('../../controllers/user/socialLogin');
const moment       =  require('moment');

module.exports = function (options) {
  return function (req, res, next) {

    // This is responsible for all authenticatio
    // For now we authenticate all requests with the tokens
    // saved in our database 
    // If the user does note exist we return a 400
    const token = req.headers.authorization;
    if (token) {
      var parts = token.split(' ')
      if (parts[1] === "facebook") {
        // if user press login with facebbok 
        passPortSocialLogin.authenticatingUserFacebook(parts[2],req,res,next)
      }else if(parts[1] === "google-oauth2"){
         // if user press login with google-oauth2 
         passPortSocialLogin.authenticatingUserGoogle(parts[2],req,res,next)
      }else{
        moment.suppressDeprecationWarnings = true;
        var nowDate = moment().format('L');
        console.log('nowDate',nowDate);
         // if user only need user data through user get api
        db.usersToken.findAndCountAll({
          where: { token: parts[1]}
        })  
        .then(userstoken => { 
          if (userstoken.rows.length == 1 ) {
            let provider = false;
            req.user_id = userstoken.rows[0].user_id;
            next()
          } else {
            // if ()
            res.status(404).send({error :'Invalid access token!'});
          }
        });
      }
      console.log('partss',parts[1]);
     
    } else {
      res.status(400).send('Please add Authorization Headers');
    }

  }
}