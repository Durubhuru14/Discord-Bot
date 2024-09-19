module.exports = {
    name: "ping",
    description: "Replies with bot ping!",
  
    callback: async (client, interaction) => {
      await interaction.deferReply();
  
      const reply = await interaction.fetchReply();
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
      
      // Check WebSocket ping
      const wsPing = client.ws.ping;
      const wsPingMessage = wsPing === -1 ? "Unable to reach the server" : `${wsPing}ms`;
  
      interaction.editReply(`Pong! Client ${ping}ms | WebSocket: ${wsPingMessage}`);
    }
  };  