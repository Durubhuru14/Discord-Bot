const {ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');
const { description } = require('../misc/ping');

module.exports = {
    name: "ban",
    description: "Bans a member",
    // devOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: "target-user",
            description: "The user to ban",
            required: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: "reason",
            description: "Reason to ban the user",
            required: false,
            type: ApplicationCommandOptionType.String
        }
    ],

    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`Ban`)
    }
}