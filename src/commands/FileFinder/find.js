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

    let responseMessage = "Fetching resource..."; // Placeholder message

    // Placeholder logic based on subcommands
    if (subcommandGroup === "dsa") {
      switch (subcommand) {
        case "practical":
          const practicalNameOrNo = interaction.options.getString(
            "practical_name_or_no",
          );
          responseMessage = `Fetching DSA practicals for: ${practicalNameOrNo}`;
          break;
        case "assignment":
          const assignmentNo = interaction.options.getString("assignment_no");
          responseMessage = `Fetching DSA assignments for assignment number: ${assignmentNo}`;
          break;
        case "notes":
          const notes = interaction.options.getString("notes");
          responseMessage = `Fetching DSA notes: ${notes}`;
          break;
        default:
          responseMessage = "Unknown command!";
      }
    }

    // Send placeholder response
    await interaction.reply({
      content: responseMessage,
      ephemeral: true, // Only visible to the user
    });
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
    ),
};
