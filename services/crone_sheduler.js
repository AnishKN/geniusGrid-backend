const schedule = require('node-schedule');


const job = schedule.scheduleJob('*/10 * * * * *', function(){
    //send Push notification here
});