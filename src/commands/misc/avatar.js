const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    // Get the avatar URL with a higher resolution (1024px) and dynamic format
    const avatarURL = targetUser.user.avatarURL({ size: 1024, dynamic: true });

    // Create an embed to display the avatar
    const avatarEmbed = new EmbedBuilder()
      .setTitle(`${targetUser.user.username}'s Avatar`)
      .setImage(avatarURL)
      .setColor("Random");

    await interaction.editReply({ embeds: [avatarEmbed] });
  },

  name: "avatar",
  description: "Shows profile picture of a user",
  options: [
    {
      name: "target-user",
      description: "The user whose avatar will be displayed",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.SendMessages],
  botPermissions: [PermissionFlagsBits.SendMessages],
};
