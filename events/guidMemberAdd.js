const { roleManager, constructImageAndSend } = require('../helperFunctions');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.id === '965667610903597139');
        if (!channel) {
            console.log('Channel not found.');
            return;
        }
        constructImageAndSend(member.user, channel);
        roleManager(member, "Select Your Roles", true);
        member.send(`Here is a tutorial on setting up profile. You can follow this if you face any problem or can't understand how to get self-assignable roles.
        https://youtu.be/6SUq1dvL-XI`);
    }
}
