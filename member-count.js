
module.exports = client => {
    
    const channelId = "977875081378275358";


    const updateMember = (guild) => {
        const channel = guild.channels.cache.get(channelId);
        const mem = guild.memberCount;
        const botMem = guild.members.cache.filter(m => m.user.bot).size;
        const organicMember = eval(mem - botMem);
        channel.setName(`👥┋Members: ${organicMember}`);
    }

    client.on('guildMemberAdd', (member) => updateMember(member.guild));
    client.on('guildMemberRemove', (member) => updateMember(member.guild));

    const guild = client.guilds.cache.get(process.env.guildId);
    updateMember(guild);

}