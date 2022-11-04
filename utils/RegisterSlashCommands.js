const fs = require("fs");
const path = require("path");
const {REST } = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const { TOKEN, clientId } = require("../config");

module.exports = (client, guild) => {
  console.log("Registering slash commands for " + guild);

  let commandsDir = path.join(__dirname, "..", "commands");

  fs.readdir(commandsDir, (err, files) => {
    if (err) throw err;
    files.forEach(async (file) => {
      let cmd = require(commandsDir + "/" + file);
      if (!cmd.SlashCommand || !cmd.SlashCommand.execute) return;
      let dataStuff = {
        name: cmd.name,
        description: cmd.description,
        options: cmd.SlashCommand.options,
      };
      
    
  

      const guild_ids = client.guilds.cache.map(guild => guild);

      const rest = new REST({version: "9"}).setToken(TOKEN);

	    for (const guildId of guild_ids)
	    { 
        rest.put(Routes.applicationGuildCommands(clientId, guildId.id), {
          body: dataStuff
        })
        .then(() => console.log(`Added commands to ${guildId.id}, Name of Guild: ${guildId.name}`))
        .catch(console.error);
      }

    });
  });
};
