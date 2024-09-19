const { server } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = (client) => {
  try {
    const localCommands = getLocalCommands();
  } catch (error) {
    console.log(`There was an error ${error}`)
  }
};
