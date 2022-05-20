const { SlashCommandBuilder } = require('@discordjs/builders');
const { fetchAllMessages } = require('../helperFunctions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('msgcount')
        .setDescription('Sends the amount of messages in tge channel!'),
    async execute(interaction) {
        const amount = (await fetchAllMessages(interaction.channel)).length;
        await interaction.reply({ content: `Total ${amount} messages in channel ${interaction.channel}`, ephemeral: true })
    }
}

