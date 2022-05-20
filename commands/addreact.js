const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addreact')
        .setDescription('Adds a reaction to a message!')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Channel to get the message!')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('Message_id to react.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reaction')
                .setDescription('Reaction / Emoji to react.')
                .setRequired(true)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.ADD_REACTIONS)) {
            interaction.reply({ content: `You don't have permission to send messages to ${interaction.member.channel}.`, ephemeral: true });
            return
        }
        let channel = interaction.options.get('channel').value.replace(/<#|>/gm, '');
        channel = interaction.guild.channels.cache.get(channel);
        const message_id = interaction.options.get('message_id').value;
        const reaction = interaction.options.get('reaction').value.split(' ');
        //interaction.guild.channels.cache.get(channel).fetch(message_id)
        //.then(message => message.react(reaction))
        try {
            channel.messages.fetch(message_id).then(message => {
                reaction.map(react => {
                    message.react(react);
                });
                interaction.reply({ content: `Reacted to \n"${message.content}"`, ephemeral: true });
            })
        } catch (error) {
            console.log(error);
        }

    }

}