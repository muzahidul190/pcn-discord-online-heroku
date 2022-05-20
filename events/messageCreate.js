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
        messageHandler(message);
        console.log(`${message.member.user.username} in #${message.channel.name} triggered an message.`);
    },
};
