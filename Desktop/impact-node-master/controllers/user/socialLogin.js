

const db           =  require('../../db/index');
const request      =  require('request-promise');
var configAuth     =  require('../../config/authConfig');
const userModel    =  require('./index.js');
const randomToken  =  require('random-token');
const moment       =  require('moment');


const sendmail              =  require('../nodemailerService.js');


module.exports = {
     

    // saving auth_token in oauth2_provider_accesstoken table in db  .
    creatusersToken_token(req,res,next,provider,userResponse,token){
        moment.suppressDeprecationWarnings = true;
        console.log('userResponse')
        var nowDate         =   moment().add(90, 'days').calendar();
        var expireDate      =   moment(nowDate).format(); ;
        let accessTokendata =  {
            token           :  token,
            expires         :  expireDate,
            scope           :  "read write",
            application_id  :  3,
            user_id         :  userResponse.user_id,

        }
        db.usersToken.create(accessTokendata).then((accessTokendataresponse)=>{
            let usertoken = JSON.parse(JSON.stringify(accessTokendataresponse)).token
            let provider  = true;
            var templet   =  "<div><h1>Welcome to Impact Club "+userResponse.first_name+" "+userResponse.last_name + " </h1><p>Get fit do good</p><img src='https://i.gifer.com/47in.gif' width='300' height='200'></div>"
            sendmail.sendMail("Welcome "+userResponse.first_name,userResponse.email,"Hello","Welcome to Impact Club",templet);
            req.headers.authorization = 'bearer '+ usertoken;
            next();
             
        })
    },

    // saving fb google socialAuth token to social_auth_usersocialauth table in db
    createSocialAuth_token(req,res,provider,userResponse,uid,extradata){
        let usersocialauthdata = {
            provider    :  provider,
            uid         :  uid,
            extra_data  :  JSON.stringify(extradata),
            user_id     :  userResponse.user_id,
        }
        db.usersocialauth.create(usersocialauthdata).then((responsdatasocialauthtoken)=>{
        })
    },
    


    // generating unique auth_token and saving it to authtoken_token table and linking to oauth2_provider_accesstoken table in db
    creatAuthtoken_token(req,res,next,provider,userResponse){
        let generatedKey  =  randomToken(40);
        let createdDate   =  new Date();
        let userId        =  userResponse.user_id

        let authtokendata = {
            key      :  generatedKey,  
            created  :  createdDate,
            user_id  :  userId,
        }
        db.authToken.create(authtokendata).then((responsdatasocialauthtoken)=>{
            this.creatusersToken_token(req,res,next,provider,userResponse,generatedKey)
        })
    },

    // calling Facebook graph api for singning user and creating new user share_api_user table in db 
    authenticatingUserFacebook(token,req,res,next){
        const tokenheader   =  req.headers.authorization;
        var parts           =  tokenheader.split(' ');
        const userFieldSet  =  'id, name, about, email,gender,first_name,last_name,birthday,picture';
        const options       =  {
                                method : 'GET',
                                uri    : `https://graph.facebook.com/me/`,
                                qs     : {
                                           access_token :  token,
                                           fields       :  userFieldSet
                                         }
                                };
        request(options)
        .then(fbRes => {
            var tokengen = randomToken(25);
            let userdata = JSON.parse(fbRes);
            let Resuid   = JSON.parse(fbRes).id;
            db.usersocialauth.findAndCountAll({
                where:{
                    uid:Resuid,
                }
            }).then((user)=>{
                let signedDate  = new Date();
                console.log('user',user);
                if (user.count === 0 ) {
                    let joineddate  = new Date();
                    let user = {
                       first_name     :  userdata.first_name,
                       last_name      :  userdata.last_name,
                       gender_user    :  userdata.gender,
                       email_id       :  userdata.email,
                       date_signed_in :  signedDate,
                       date_joined    :  joineddate,
                       email          :  userdata.email,
                       is_active      :  true,
                       is_staff       :  false,
                       is_superuser   :  false,
                       last_login     :  null,
                       social_thumb   :  userdata.picture.data.url,
                       username       :  userdata.first_name+userdata.last_name+randomToken(5),
                       cheat_flag     :  false,
                       is_volunteer   :  false,
                       password       :  tokengen,
                    }

                    db.users.create(user)
                    .then((userresponse)=>{
                        var provider      =   parts[1];
                        var extradata     =   {  access_token:parts[2],expires:null,id:userdata.id  };
                        let userResponse  =   JSON.parse(JSON.stringify(userresponse));
                        req.user_id       =   userResponse.user_id;   
                        this.createSocialAuth_token(req,res,provider,userResponse,Resuid,extradata);
                        this.creatAuthtoken_token(req,res,next,provider,userResponse);
                    })
                }else{
                    let userid = JSON.parse(JSON.stringify(user)).rows[0].user_id
                    db.users.findAndCountAll({
                        where:{user_id:userid}
                    }).then((responseuser)=>{
                        let userResponse  = JSON.parse(JSON.stringify(responseuser)).rows[0]                      
                        req.user_id       = responseuser.user_id               
                        db.usersToken.findAll({
                            where:{
                               user_id:userResponse.user_id
                            }
                        }).then((userTokenData)=>{
                            console.log('userTokenData',JSON.parse(JSON.stringify(userTokenData)),userResponse);
                            let usertoken  =  JSON.parse(JSON.stringify(userTokenData))[0].token
                            let provider   =  true;

                            req.headers.authorization = 'bearer '+ usertoken;
                            next();
                        })
                    })
                }
            })
            
        })
    },

    // calling Google graph api for singning user and creating new user share_api_user table in db
    authenticatingUserGoogle(token,req,res,next){
        const tokenheader = req.headers.authorization;
        var parts         = tokenheader.split(' ');
        const options     = {
                                method: 'GET',
                                uri: 'https://www.googleapis.com/plus/v1/people/me?access_token=' + token,
                            };
        request(options)
        .then(GoogleRes => {
            var tokengen    =  randomToken(25);
            let signedDate  =  new Date()
            var Resuid      =  JSON.parse(GoogleRes).emails[0].value;
            let userdata    =  JSON.parse(GoogleRes);
            db.usersocialauth.findAndCountAll({
              where:{
                uid:Resuid,
              }
            }).then((user)=>{
             let joineddate  = new Date()
             if (user.count === 0 ) {
                   let user = {
                       first_name      :  userdata.name.givenName,
                       last_name       :  userdata.name.familyName,
                       gender_user     :  userdata.gender,
                       email_id        :  userdata.emails[0].value,
                       date_signed_in  :  signedDate,
                       date_joined     :  joineddate,
                       email           :  userdata.emails[0].value,
                       is_active       :  true,
                       is_staff        :  false,
                       is_superuser    :  false,
                       last_login      :  null,
                       social_thumb    :  userdata.image.url,
                       username        :  userdata.displayName,
                       cheat_flag      :  false,
                       is_volunteer    :  false,
                       password        :  tokengen,
                    }
                    db.users.create(user)
                    .then((userresponse)=>{
                        var provider      =   parts[1];
                        var extradata     =   {  access_token:parts[2],expires:null,id:userdata.id  };
                        let userResponse  =   JSON.parse(JSON.stringify(userresponse))
                        this.createSocialAuth_token(req,res,provider,userResponse,Resuid,extradata)
                        this.creatAuthtoken_token(req,res,next,provider,userResponse)
                    })
             }else{
                let userid = JSON.parse(JSON.stringify(user)).rows[0].user_id;
                db.users.findAndCountAll({
                    where:{user_id:userid}
                }).then((responseuser)=>{

                    let userResponse  =   JSON.parse(JSON.stringify(responseuser)).rows[0]
                    req.user_id       =   userResponse.user_id
                    db.usersToken.findAll({
                        where:{
                         user_id:req.user_id
                        }
                    }).then((userTokenData)=>{
                        let usertoken  =  JSON.parse(JSON.stringify(userTokenData))[0].token
                        let provider   =  true;
                        req.headers.authorization = 'bearer '+ usertoken;
                        next();
                    })
                   
                })
             }
            })
                
        })

    }

   

};






// file created by akash on 22/05/2018
