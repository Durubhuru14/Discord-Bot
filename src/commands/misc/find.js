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
    const targetFile = interaction.options.get("file-name").value;
    await interaction.deferReply();

    try {
      const response = await fetch("https://durubhuru14.github.io/data.json");
      const data = await response.json();
      const foundFiles = [];

      data.forEach((element) => {
        if (element.name.toLowerCase().includes(targetFile.toLowerCase())) {
          foundFiles.push(element);
        }
      });

      // Create a single embed for all found files
      const embed = new EmbedBuilder()
        .setFooter({ text: `Requested by ${interaction.user.username}` })
        .setTimestamp();

      // Check if no files are found
      if (foundFiles.length === 0) {
        embed
          .setColor("#FF0000") // Red color for failure
          .setTitle("No Files Found")
          .setDescription(`No files matching \`${targetFile}\` were found.`);
      } else {
        embed
          .setColor("#4BB543") // Green color for success
          .setTitle("Found Files")
          .setDescription(`Files matching \`${targetFile}\``);

        // Add each file as a field in the embed
        foundFiles.forEach((file) => {
          embed.addFields({
            name: file.alias,
            value: `[Link](${file.link})\nLast Modified: ${file.lastModified || "Unknown"}`,
          });
        });
      }

      // Send the embed
      await interaction.editReply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.log(`There was an error: ${error}`);

      // Notify the user about the error with a red embed
      const errorEmbed = new EmbedBuilder()
        .setColor("#FF0000") // Red color for error
        .setTitle("Error")
        .setDescription(
          `There was an error fetching the data. Please try again later.`,
        )
        .setFooter({ text: `Requested by ${interaction.user.username}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
  name: "find",
  description: "Find the file from the API for study stuff!",
  options: [
    {
      name: "file-name",
      description: "The name of the file you want to find.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  botPermissions: [PermissionFlagsBits.UseEmbeddedActivities],
};
