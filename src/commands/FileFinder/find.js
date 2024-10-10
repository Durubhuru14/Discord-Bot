const {
  Client,
  Interaction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  run: async ({ interaction, client }) => {
    // Determine which subcommand was used
    const subcommandGroup = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();

    try {
      const response = await fetch("https://durubhuru14.github.io/data.json");
      const data = await response.json();

      const subject = data[subcommandGroup];
      const category = subject[subcommand];
      const userInput =
        interaction.options.getString("practical_name_or_no") ||
        interaction.options.getString("assignment_no") ||
        interaction.options.getString("notes");

      let resources;

      // If the user input is "all", get all resources in the category
      if (userInput.toLowerCase() === "all") {
        resources = category;
      } else {
        // Filter resources based on the user input
        resources = category.filter((item) =>
          item.name.toLowerCase().includes(userInput.toLowerCase()),
        );
      }

      // Respond with the found resources or an appropriate message
      if (resources.length > 0) {
        const embed = new EmbedBuilder()
          .setTitle(
            `${subcommandGroup.toUpperCase()} - ${subcommand.charAt(0).toUpperCase() + subcommand.slice(1)}`,
          )
          .setColor(0x00ff00);

        resources.forEach((resource) => {
          embed.addFields(
            {
              name: `Resource: ${resource.name}`,
              value: `Preview: [Click here](${resource.preview})\nDownload: [Click here](${resource.download})`,
            },
            {
              name: "Last Modified",
              value: resource.lastModified,
              inline: true,
            },
          );
        });

        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.reply({
          content: "Sorry, no resources found for your input.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      await interaction.reply({
        content: "An error occurred while fetching the resource.",
        ephemeral: true,
      });
    }
  },

  data: new SlashCommandBuilder()
    .setName("find")
    .setDescription("To find notes, assignments, and practicals of subjects")
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("dsa")
        .setDescription("Subject: Digital System and Architecture")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("practical")
            .setDescription("Fetches practicals of DSA")
            .addStringOption((option) =>
              option
                .setName("practical_name_or_no")
                .setDescription("Practical name or number")
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("assignment")
            .setDescription("Fetches assignments of DSA")
            .addStringOption((option) =>
              option
                .setName("assignment_no")
                .setDescription("Assignment number")
                .setRequired(true),
            ),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("notes")
            .setDescription("Fetches notes of DSA")
            .addStringOption((option) =>
              option
                .setName("notes")
                .setDescription("Notes of DSA subject")
                .setRequired(true),
            ),
        ),
    )
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("los")
        .setDescription("Subject: Linear Operating Systems")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("assignment")
            .setDescription("Fetches assignments of LOS")
            .addStringOption((option) =>
              option
                .setName("assignment_no")
                .setDescription("Assignment number")
                .setRequired(true),
            ),
        ),
    )
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("python")
        .setDescription("Subject: Python Programming")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("assignment")
            .setDescription("Fetches assignments of Python")
            .addStringOption((option) =>
              option
                .setName("assignment_no")
                .setDescription("Assignment number")
                .setRequired(true),
            ),
        ),
    ),
};
