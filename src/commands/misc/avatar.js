const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */

  run: async ({ interaction, client, handler }) => {
    const targetUser = interaction.options.getUser("user");

    await interaction.deferReply();

    if (!targetUser) {
      await interaction.editReply("That user doesn't exist.");
      return;
    }

    // Get the avatar URL with higher resolution (1024px) and dynamic format
    const avatarURL = targetUser.displayAvatarURL({
      size: 1024,
      dynamic: true,
    });

    // Create an embed to display the avatar
    const avatarEmbed = new EmbedBuilder()
      .setTitle(`${targetUser.username}'s Avatar`)
      .setImage(avatarURL)
      .setColor("Random");

    await interaction.editReply({ embeds: [avatarEmbed] });
  },

  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Shows the profile picture of a user!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user whose avatar you want to see")
        .setRequired(true),
    ),
};
