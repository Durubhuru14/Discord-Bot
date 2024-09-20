const { server } = require("../../config.json");
const { Client, Interaction } = require("discord.js");
module.exports = async (client) => {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  // Delete all global commands
  const globalCommands = await client.application.commands.fetch();
  for (const command of globalCommands.values()) {
    await client.application.commands.delete(command.id);
    console.log(`Global command "${command.name}" deleted.`);
  }
  console.log("All global commands deleted.");

  // Delete all guild-specific commands (for each guild)
  const guildId = server; // Replace with your guild (server) ID
  const guild = await client.guilds.fetch(guildId);
  const guildCommands = await guild.commands.fetch();

  for (const command of guildCommands.values()) {
    await guild.commands.delete(command.id);
    console.log(`Guild command "${command.name}" deleted.`);
  }
  console.log("All guild commands deleted.");
};
