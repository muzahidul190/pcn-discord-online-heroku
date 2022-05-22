
const { token, guildId, clientId } = require('./config.json');

module.exports = client => {
    const channelId = "977875081378275358";


    const updateMember = (guild) => {
        const channel = guild.channels.cache.get(channelId);
        channel.setName(`Members: 👤 ${guild.memberCount.toLocaleString()}`);
    }

    client.on('guildMemberAdd', (member) => updateMember(member.guild));
    client.on('guildMemberRemove', (member) => updateMember(member.guild));

    const guild = client.guilds.cache.get(guildId);
    updateMember(guild);

}