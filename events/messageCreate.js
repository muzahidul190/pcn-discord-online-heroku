const { messageHandler } = require('../helperFunctions')

module.exports = {
    name: 'messageCreate',
    execute(message) {
        if (message.author.bot) {
            if(message.content === `HADAHSDAHDHA`){
                message.react('🎉');
            }
            return;
        };
        console.log(`Message from ${message.author.username}: ${message.content}`);
        if(message.channel.type === 'DM'){
            message.author.send(`Oops...I'm still getting developed. Please try again later. You may get something amazing reply then 🥱`);
            return;
        }
        
        messageHandler(message);
    },
};
