
const nodemailerService = require('../nodemailerService.js');
const db = require('../../db/index');
var events = require('events');
var eventEmitter = new events.EventEmitter();

function getAlluser (){
  return db.users.findAndCountAll({
  	limit:100,
  })
  .then(user=>{
  	console.log("user",user);
  })
 }
//Create an event handler:
var EventHandlerEveryWeekStatus = function () {
  getAlluser();
}

//Assign the eventhandler to an event:
eventEmitter.on('scream', EventHandlerEveryWeekStatus);

//Fire the 'scream' event:
