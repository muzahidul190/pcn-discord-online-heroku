const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const { deleteMessages } = require('../helperFunctions');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('clr')
        .setDescription('Deletes message!')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Number of messages to delete. Leave empty to delete all.')
                .setRequired(false)
        ),
    async execute(interaction) {
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            interaction.reply({ content: `You don't have  the permission to delete messages`, ephemeral: true });
            return
        }

        let amount = interaction.options.get('amount') ? parseInt(interaction.options.get('amount').value) + 1 : 'all';
        console.log("Amount", amount);
        if (amount === 101) amount = 100;
        console.log(amount);
        if (amount > 100) {
            interaction.reply({ content: "You can't delete messages more than 100. For that just say /clr", ephemeral: true });
            return;
        }
        const channel = interaction.client.channels.cache.get(interaction.channelId);
        const size = await deleteMessages(channel, amount);
        interaction.reply(`Deleting ${size} messages`);
    }
}

