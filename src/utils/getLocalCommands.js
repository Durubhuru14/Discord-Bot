const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true,
  );

  console.log(commandCategories);
  return localCommands;
};
