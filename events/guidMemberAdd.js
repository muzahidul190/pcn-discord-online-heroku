const { roleManager, constructImageAndSend } = require('../helperFunctions');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-and-goodbyes');
        if (!channel) {
            console.log('Channel not found.');
            return;
        }
        constructImageAndSend(member.user, channel);
        roleManager(member, "Select Your Roles", true);
    }
}
