const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendmsg')
        .setDescription('Sends a message to a channel!')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Channel to send message!')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message to send.')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
            interaction.reply({ content: `You don't have permission to send messages to ${interaction.member.channel}.`, ephemeral: true });
            return
        }
        const channel = interaction.options.get('channel').value.replace(/<#|>/gm, '');
        let message = interaction.options.get('message').value;
        let msg = message.split('\\n');
        message = "";
        msg.map(x => {message += x.trim() + '\n';});
        console.log(channel, message);
        interaction.guild.channels.cache.get(channel).send(message);
        interaction.reply({ content: 'sent your message', ephemeral: true });
    }

}