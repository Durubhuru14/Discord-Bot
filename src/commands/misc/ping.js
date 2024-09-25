const {
  Client,
  Interaction,
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
 /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
    run: async ({interaction, client, handler}) => {
      await interaction.deferReply();
  
      const reply = await interaction.fetchReply();
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
      
      // Check WebSocket ping
      const wsPing = client.ws.ping;
      const wsPingMessage = wsPing === -1 ? "Unable to reach the server" : `${wsPing}ms`;
  
      interaction.editReply(`Pong! Client ${ping}ms | WebSocket: ${wsPingMessage}`);
    },

    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with bot ping!"),
    options: {
      devOnly: true,
    }
  };  