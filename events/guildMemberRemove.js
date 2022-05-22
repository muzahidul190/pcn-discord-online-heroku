const { constructImageAndSend } = require('../helperFunctions');
//Codes for member count
const memberCount = require('../member-count.js');

module.exports = {
    name: 'guildMemberRemove',
    async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-goodbyes');
        if (!channel) {
            console.log('Channel not found.');
            return;
        }
        constructImageAndSend(member.user, channel, 'Goodbye', 'We\'ll miss you 😥');

        
        updateMember(member.guild);
    }
}
