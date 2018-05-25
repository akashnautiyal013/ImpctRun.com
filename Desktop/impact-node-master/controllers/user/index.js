const { isNullOrUndefined } =  require("util");
const request               =  require('request-promise');
// import { json } from "../../../../.cache/typescript/2.6/node_modules/@types/express";

const nodemailer            =  require ("nodemailer");
const sendmail              =  require('../nodemailerService.js');

var config                  =  require('config');
const logger                =  require('../../logger');
const db                    =  require('../../db/index');
const pagin                 =  require('../../middleware/pagination');
const env                   =  require('../../config/settings');
const paginconfig           =  env.pagination;
var Sequelize               =  require("sequelize");
var sequelize               =  db.sequelize;
var events                  =  require('events');
var eventEmitter            =  new events.EventEmitter();
const runFile               =  require('../mailerEventControllers/weekStatusmail.js');
const filterList            =  [
                                  ['user_id', 'integer'],
                                  ['first_name', 'string'],
                                  ['last_name', 'string'],
                                  ['email', 'string']
                               ];

const passport              =  require('passport');



function getAlluser (user_id){
  
  return db.users.findAndCountAll({
    where:{user_id:user_id},
    attributes:['user_id','email']
  })
  .then(user=>{
    var userdata = JSON.parse(JSON.stringify(user)).rows;
    for (var i = userdata.length - 1; i >= 0; i--) {
      userdata[i]
      console.log('user:data',userdata[i].email);
    };
   // userdata.map((user,i)=>{
   //   console.log('user_id',user.email,);
   //   getLastWeekRuns(user.user_id)
   // })
  })
}

function getLastWeekRuns(){
  var d = new Date();
    return db.runs.findAndCountAll({
      attributes:["run_amount","user_id_id"],
      where:{start_time:{
        $gt:d.setDate(d.getDate()-300)}
      }
    })
  .then(runs =>{
    var runsData = JSON.parse(JSON.stringify(runs)).rows;
    console.log("runs",JSON.parse(JSON.stringify(runs)).rows);
    var sumDistance = 0 ;
    var sumAmount = 0;
    var sumCalories = 0;
    var sumSteps = 0 ;
    runsData.map((run,i)=>{  
      console.log('run_amount',run.run_amount)
        getAlluser(run.user_id_id)  
        
        
    })

  })
 }



 
//Create an event handler:
var EventHandlerEveryWeekStatus = function () {
  getLastWeekRuns();
}

//Assign the eventhandler to an event:
eventEmitter.on('scream', EventHandlerEveryWeekStatus);


var actualUserData = "SELECT u.user_id, o.token, u.first_name, u.last_name, u.gender_user, u.email, u.phone_number," +
  "u.address, u.locality_user, u.city, u.state, u.country,sum(r.distance) AS total_distance, sum(r.run_amount) AS total_amount," +
  "u.social_thumb, u.birthday, u.body_height, u.body_weight FROM public.share_api_users u " +
  "LEFT JOIN public.oauth2_provider_accesstoken o ON u.user_id = o.user_id " +
  "LEFT JOIN public.share_api_runs r ON o.user_id = r.user_id_id where o.token=:token_id " +
  "GROUP BY u.user_id, o.token, u.first_name, u.last_name, u.gender_user, u.email_id, u.phone_number,u.address;"


 function SendSignupMail(emailTitle,email,textMessage,subject,templets){

   sendmail.sendMail(emailTitle,email,textMessage,subject,templet);
}





async function getTeamId(user) {
  let team = await db.employee.findAll({
    attributes: ["team_id"],
    where: {
      user_id: user,
      is_logout: false
    }
  }).then(myteam => {
    myteam = JSON.parse(JSON.stringify(myteam));
    if (myteam.length > 0) {
      myteam = myteam[0].team_id;
      return myteam;
    }
    else {
      return null;
    }


  })
    .catch(err => {
      logger.info("Error while fetching team data", err);
      return err;
    })

  return team;

}

var userModel = {

  //GET all users
  getUsers(req, res) {
   
      var urlQuery = req.query;
      let user = req.user_id;
      const token = req.headers.authorization;

      let token_parts = token.split(' ');

      var whereQuery = pagin.createQuery(urlQuery, filterList);
      if (!urlQuery.user_id) {

        whereQuery.user_id = user;
      }
      return db.users.findAndCountAll({
        where: whereQuery,
        limit: paginconfig.SMALL,
        offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
      })

      .then(user => {
        res.json(pagin.getPagination(user, req, paginconfig.SMALL));
      })

  },

  //get all feedback for particular users and filters
  async getActualUserData(req, res) {
    var urlQuery = req.query;
    const token = req.headers.authorization;
    let token_parts = token.split(' ');
    var auth_token = token_parts[1];
    console.log('auth_token',auth_token);
    let user = req.user_id;
    let team = await getTeamId(user) ||0;
    
    return sequelize.query(actualUserData,
      {
        replacements: { token_id: auth_token },
        type: sequelize.QueryTypes.SELECT
      }
    ).then(results => {

      let overall = {};
      overall = results[0];

      let distance = {
        total_distance: overall.total_distance
      };
      let amount = {
        total_amount: overall.total_amount
      };

      overall.auth_token = overall.token;
      overall.total_distance = distance;
      overall.total_amount = amount;
      overall.team_code = team;
      overall.sign_up = false;    // hard coded (Not usefull)
     
      delete overall.token;
      results[0] = overall;
      
      res.json(results);
    }).catch(err => {
      logger.error("Error whille getting user data ",err);
      res.status(500).send({ error: 'Something failed! Contact the admin.' })
      throw new Error(err);
    })
  },


  getLeaderboard(req, res) {
      var urlQuery = req.query;
      var whereQuery = pagin.createQuery(urlQuery, filterList);
      //console.log("paginconfig------------------", paginconfig.SMALL);
      return db.leaderboard.findAndCountAll({
        where: whereQuery,
        limit: paginconfig.SMALL,
        offset: (urlQuery.page == 0 || (isNaN(urlQuery.page)) ? 1 : urlQuery.page == 1) ? 0 : ((urlQuery.page - 1) * paginconfig.SMALL)
      })
      .then(user => {
        res.json(pagin.getPagination(user, req, paginconfig.SMALL));
      })
  },

   
  updateUser(req, res) {
    let update_data = req.body;
    let user = req.user_id;

    let user_id = req.params.user ? req.params.user : update_data.user_id;



    //created new object for columns which will update
    let update_object = {};
    if (update_data.first_name)
      update_object.first_name = update_data.first_name;
    if (update_data.last_name)
      update_object.last_name = update_data.last_name;
    if (update_data.gender_user)
      update_object.gender_user = update_data.gender_user;
    if (update_data.profile_picture)
      update_object.profile_picture = update_data.profile_picture;
    if (update_data.birthday)
      update_object.birthday = update_data.birthday;
    if (update_data.body_height)
      update_object.body_height = update_data.body_height;
    if (update_data.body_weight)
      update_object.body_weight = update_data.body_weight;
    if (update_data.email)
      update_object.email = update_data.email;
    if (update_data.phone_number)
      update_object.phone_number = update_data.phone_number;


      db.users.update(update_object, {
        where: {
          user_id: user_id || user
        }
      })


      .then(update_result => {


        // console.log("runFile",runFile);
        // SendSignupMail("Impact Welcome","akash.nautiyal013@gmail.com,nishantKhandelwal69@gmail.com,nikhil@impactrun.com,partthanjaria612@gmail.com,nymd.tk@gmail.com,corez668@gmail.com,ishan@impactrun.com,kanak@impactrun.com,akash@impactrun.com","TextMessage","Subject","<Br>Html Templets</Br>");
        // console.log("update_result", update_result);
         // eventEmitter.emit('scream',(data)=>{
         //  // console.log("data",data);
         // });
         authenticatingUser();
        if (isNaN(update_result) || isNullOrUndefined(update_result)) {
          res.status(403).send({ error: "unable to update given data." });
          return;
        }
        if (update_result.length > 0) {
          res.status(200).send({ success: "user detail updated successfully" });
        }
        else {
          logger.error("invalid data", update_data);
          res.status(403).send({ error: "unable to update given data" });
        }
      })
      .catch((error) => {
        logger.error("error occured while updating user detail", req.body, error);
        res.status(400).send({ error: "error occured while updating user detail" });
      })

  }



  

}


module.exports = userModel;