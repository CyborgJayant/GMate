var TelegramBot=require('node-telegram-bot-api')
var token='1357987164:AAGBqcdILmGQNPjrK1rmRdKIi4DRoMkvOMg'
var bot=new TelegramBot(token, {polling:true})

bot.onText(/\/start/,(msg,match)=>{
    var chatId=msg.chat.id
    var msgSend='Thanks for using this bot\nUse /\help command to get all the features this bot can provide'
    bot.sendMessage(chatId,msgSend)
});

bot.onText(/\/authors/,(msg,match)=>{
    var chatId=msg.chat.id
    bot.sendMessage(chatId,'Jayant\nGurmeet\nHrishita')
});

bot.onText(/\/help/,(msg,match)=>{
    var chatId=msg.chat.id
    bot.sendMessage(chatId,'Currently in developnment')
});