const { SlashCommandBuilder } = require('@discordjs/builders')
const { ReactionCollector } = require('discord.js')
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rmvreact')
        .setDescription('Removes all reaction from a message!')
        .addStringOption(option =>
            option.setName('channel')
                .setDescription('Channel to get the message!')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('Message id to remove reaction.')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                interaction.reply({ content: `You don't have permission to send messages to ${interaction.member.channel}.`, ephemeral: true });
                return
            }
            let channel = interaction.options.get('channel').value.replace(/<#|>/gm, '');
            channel = interaction.guild.channels.cache.get(channel);
            const message_id = interaction.options.get('message_id').value;
            channel.messages.fetch(message_id).then(message => {
                message.reactions.removeAll();
                interaction.reply({ content: `Removed all reaction from \n"${message.content}"`, ephemeral: true });
            }).catch(err => {
                console.log("Unknown Message Id");
                interaction.reply({ content: `Unknown Message Id`, ephemeral: true });
            })
        } catch (error) {
            console.log(error);
        }

    }

}