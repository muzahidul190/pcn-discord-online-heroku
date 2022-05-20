const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hi!'),
    async execute(interaction) {
        await interaction.reply(`Hi ${interaction.member}`);
    }
}

