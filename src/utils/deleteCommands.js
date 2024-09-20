const { server } = require("./../../config.json"); // Adjust the path as needed

module.exports = async (client) => {
  try {
    // Delete all global commands
    const globalCommands = await client.application.commands.fetch();
    for (const command of globalCommands.values()) {
      await client.application.commands.delete(command.id);
      console.log(`Global command "${command.name}" deleted.`);
    }
    console.log("All global commands deleted.");

    // Delete all guild-specific commands (for the specified guild)
    const guild = await client.guilds.fetch(server);
    const guildCommands = await guild.commands.fetch();

    for (const command of guildCommands.values()) {
      await guild.commands.delete(command.id);
      console.log(`Guild command "${command.name}" deleted.`);
    }
    console.log("All guild commands deleted.");
  } catch (error) {
    console.error("Error while deleting commands:", error);
  }
};