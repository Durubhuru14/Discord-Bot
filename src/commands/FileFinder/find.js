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
    const subcommandGroup = interaction.options.getSubcommandGroup(false); // Get group without throwing error
    const subcommand = interaction.options.getSubcommand(false); // Same for subcommand

    try {
      const response = await fetch("https://durubhuru14.github.io/data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      let resources = [];
      const subjects = Object.keys(data);

      // Handle `/find all` (no specific subcommand group)
      if (!subcommandGroup && subcommand === "all") {
        for (const subject of subjects) {
          const subjectData = data[subject];

          for (const category in subjectData) {
            if (Array.isArray(subjectData[category])) {
              resources.push({
                title: `${subject.toUpperCase()} - ${category}`,
                items: subjectData[category],
              });
            } else if (typeof subjectData[category] === "object") {
              resources.push({
                title: `${subject.toUpperCase()} - ${category}`,
                items: [subjectData[category]],
              });
            }
          }
        }
      } else if (subcommandGroup) {
        // Handle specific subject group (e.g., `/find dsa all`)
        const subject = data[subcommandGroup];
        if (!subject) {
          throw new Error("Invalid subject category.");
        }

        if (subcommand === "all") {
          for (const category in subject) {
            if (Array.isArray(subject[category])) {
              resources.push({ title: category, items: subject[category] });
            } else if (typeof subject[category] === "object") {
              resources.push({ title: category, items: [subject[category]] });
            }
          }
        } else {
          // Handle practicals or assignments based on subcommand
          const specificCategory = subject[subcommand];
          if (!specificCategory) {
            throw new Error("Invalid subcommand category.");
          }

          let userInput = "";
          if (subcommand === "practical") {
            userInput =
              interaction.options.getString("practical_name_or_no") || "";
          } else if (subcommand === "assignment") {
            userInput =
              interaction.options.getString("assignment_number") || "";
          }

          const filteredItems =
            userInput.toLowerCase() !== "all"
              ? specificCategory.filter((item) =>
                  item.name.toLowerCase().includes(userInput.toLowerCase()),
                )
              : specificCategory;

          resources.push({ title: subcommand, items: filteredItems });
        }
      } else {
        throw new Error("Invalid command usage.");
      }

      // Create multiple embeds from gathered resources
      const embeds = resources.map((resource) => {
        const embed = new EmbedBuilder()
          .setTitle(resource.title)
          .setColor(0x00ff00)
          .setTimestamp()
          .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          });

        resource.items.forEach((item) => {
          embed.addFields({
            name: `📄 ${item.name}`,
            value:
              item.preview && item.download
                ? `**Preview:** [Click here](${item.preview})\n**Download:** [Click here](${item.download})\n**Last Modified:** ${item.lastModified}`
                : `**Last Modified:** ${item.lastModified}`,
            inline: false,
          });
        });

        return embed;
      });

      // Reply with all the embeds
      await interaction.reply({ embeds });
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
    .setDescription("Find notes, assignments, and practicals of subjects")

    // DSA Subcommand Group
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("dsa")
        .setDescription("Subject: Digital System and Architecture")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("all")
            .setDescription("Fetch all resources related to DSA"),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("practical")
            .setDescription("Fetch practicals of DSA")
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
            .setDescription("Fetch assignments of DSA")
            .addStringOption((option) =>
              option
                .setName("assignment_number")
                .setDescription("Assignment number")
                .setRequired(true),
            ),
        )
        .addSubcommand(
          (subcommand) =>
            subcommand.setName("notes").setDescription("Fetch notes of DSA"),
          // Removed string option
        ),
    )

    // LOS Subcommand Group
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("los")
        .setDescription("Subject: Linux Operating Systems")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("all")
            .setDescription("Fetch all resources related to LOS"),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("practical")
            .setDescription("Fetch practicals of LOS")
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
            .setDescription("Fetch assignments of LOS")
            .addStringOption((option) =>
              option
                .setName("assignment_number")
                .setDescription("Assignment number")
                .setRequired(true),
            ),
        )
        .addSubcommand(
          (subcommand) =>
            subcommand.setName("notes").setDescription("Fetch notes of LOS"),
          // Removed string option
        ),
    )

    // Python Subcommand Group
    .addSubcommandGroup((subcommandGroup) =>
      subcommandGroup
        .setName("python")
        .setDescription("Subject: Python Programming")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("all")
            .setDescription("Fetch all resources related to Python"),
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("practical")
            .setDescription("Fetch practicals of Python")
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
            .setDescription("Fetch assignments of Python")
            .addStringOption((option) =>
              option
                .setName("assignment_number")
                .setDescription("Assignment number")
                .setRequired(true),
            ),
        )
        .addSubcommand(
          (subcommand) =>
            subcommand.setName("notes").setDescription("Fetch notes of Python"),
          // Removed string option
        ),
    )

    // Top-Level All Subcommand
    .addSubcommand((subcommand) =>
      subcommand
        .setName("all")
        .setDescription("Fetch all resources available in the database"),
    ),
};
