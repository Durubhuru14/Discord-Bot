const { REST, Routes } = require("discord.js");
const { ClientId, server, token } = require("../config.json"); // Ensure you have clientId, guildId, and token in your config

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    // Remove all global commands
    console.log("Started removing global commands...");
    const globalCommands = await rest.get(Routes.applicationCommands(ClientId));

    for (const command of globalCommands) {
      await rest.delete(Routes.applicationCommand(ClientId, command.id));
      console.log(`🗑️ Deleted global command: ${command.name}`);
    }
    console.log("Successfully removed all global commands.");

    // Remove all guild commands
    console.log("Started removing guild-specific commands...");
    const guildCommands = await rest.get(
      Routes.applicationGuildCommands(ClientId, server)
    );

    for (const command of guildCommands) {
      await rest.delete(
        Routes.applicationGuildCommand(ClientId, server, command.id)
      );
      console.log(`🗑️ Deleted guild command: ${command.name}`);
    }
    console.log("Successfully removed all guild-specific commands.");
  } catch (error) {
    console.error("Error removing commands:", error);
  }
})();
