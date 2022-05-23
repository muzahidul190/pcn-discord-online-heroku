const { constructImageAndSend } = require('../helperFunctions');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const guild = member.guilds.cache.get(process.env.guildId);
        const channelId = "965667610903597139";
        const channel = guild.channels.cache.get(channelId);
        if (!channel) {
            console.log('Channel not found.');
            return;
        }
        constructImageAndSend(member.user, channel, 'Goodbye', 'We\'ll miss you 😥');
    }
}
