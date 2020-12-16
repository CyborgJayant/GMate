const TOKEN = process.env.TELEGRAM_TOKEN || '1357987164:AAGBqcdILmGQNPjrK1rmRdKIi4DRoMkvOMg';
var TelegramBot=require('node-telegram-bot-api');
const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
  }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://g-mate.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


// Just to ping!
/*
bot.on('message', function onMessage(msg) {
  bot.sendMessage(msg.chat.id, 'Use the defined commands please');
});
*/


bot.onText(/\/start$/,(msg,match)=>{
    var chatId=msg.chat.id
    var msgSend='Thanks for using this bot\nUse /\help command to get all the features this bot can provide'
    bot.sendMessage(chatId,msgSend)
});

bot.onText(/\/authors$/,(msg,match)=>{
    var chatId=msg.chat.id
    bot.sendMessage(chatId,'Jayant\nGurmeet\nHrishita')
});

bot.onText(/\/help$/,(msg,match)=>{
    var chatId=msg.chat.id
    msgSend="/authors   :   To get names of devs\n"+
            "/gc <options>  :   Use this command to get Google Contents\n"+
            "    <options>  :   classroomID, contentName\n";
            
    bot.sendMessage(chatId,msgSend)
});



const Client = require('google-classroom') 
const client = new Client({
  clientId: '771408724733-v8fm041qbdqmj3mee7e4lb7tmoiso0sb.apps.googleusercontent.com',
  clientSecret:  'wmOLkfsWm5YkAwR5bLJYSOTm',
  refreshToken: '1//0gou5GXdAIbQlCgYIARAAGBASNwF-L9Ir_33Sj2I86FcwvbRpKPpXQwx5gGY5YY8I-ISMR1UZt0WwlQCjSrF6WKww4tiRjRJ35HQ'
})

bot.onText(/\/gc(.*)/,(msg,match)=>{
//    var chatId=msg.chat.id
//    bot.sendMessage(chatId,'Will link API support shortly')
     let count=0;
  const chatId=msg.chat.id;
    
    let courseName=match[1];
    if(courseName.length!=0)
    {
        courseName=courseName.substring(1);
    }
   
  bot.sendMessage(chatId,"wait plz...");
    client.getCourses()
     .then(data =>{
        
        
      // console.log(data);
       const json=JSON.stringify(data);
       const json2=JSON.parse(json);
        
        
       //console.log(json2[0]);
       for(var i in json2)
       {
         //console.log(json2[i].id);
           if((json2[i].name.includes(courseName)||json2[i].section.includes(courseName)) && courseName!="")
           {
               count++;
               bot.sendMessage(chatId,"id: "+json2[i].id+"\n name:  "+json2[i].name+"\n section:"+json2[i].section)
           }
       }
        
        if(count==0 && courseName!="")
            bot.sendMessage(chatId,"No Course with such name")
        
        if(courseName=="")
           {
               for(var i in json2)
                   {
                     //console.log(json2[i].id);
                           bot.sendMessage(chatId,"id: "+json2[i].id+"\nname:  "+json2[i].name+"\nsection:"+json2[i].section)
                   }
           }
     })
    /*
    bot.sendMessage(chatId,"wait plz...");
    client.getCourseWork()
     .then(data =>{
        
        bot.sendMessage(chatId,data)
    })
  */
});


bot.onText(/\/assgn(.*)/,(msg,match)=>{
    
    let count=0;
  const chatId=msg.chat.id;
    
    let courseName=match[1];
    if(courseName.length!=0)
    {
        courseName=courseName.substring(1);
    }
   
  bot.sendMessage(chatId,"wait plz...");
    request
      .get(`https://classroom.googleapis.com/v1/courses/${clientId}/courseWork`)
      .set('Authorization', `Bearer ${refreshToken}`)
      .type('json')
      .query({
        courseId
      })
      .end((err, res) =>{
        if(err) reject(err.stack);
        if(res.body.courseWork.length == 1){
            bot.sendMessage(chatId,"id: "+res.body.courseWork[0].title+"dd"+res.body.courseWork[0].dueDate+"dt"+res.body.courseWork[0].dueTime)
        }else{
          
          for(let i = 0; i < res.body.courseWork.length; i++){
            bot.sendMessage(chatId,"id: "+res.body.courseWork[i].title+"dd"+res.body.courseWork[i].dueDate+"dt"+res.body.courseWork[i].dueTime)
          }
        }
      })
});



bot.onText(/\/twittertrends/,(msg,match)=>{
    var chatId=msg.chat.id
    bot.sendMessage(chatId,'Will link API support shortly')
});

/*
bot.onText(/?!(\/start)(\/authors)(\/help)(\/gc)(\/twittertrends)/,(msg,match)=>{
    var chatId=msg.chat.id
    bot.sendMessage(chatId,'Please Enter a valid command/message')
});
*/

bot.on('message', function(msg){
    var chatId=msg.chat.id
    let text=msg.text;
    if(text && !( (text === "/start" || text === "/authors" || text === "/help" || text.includes("/gc") || text.includes("/twittertrends") || text.includes("/assgn") ) ) )
        {       
    bot.sendMessage(chatId, "Please Enter a valid command/message");
        }
})