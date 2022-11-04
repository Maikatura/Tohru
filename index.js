const fs = require('fs');
const path = require('node:path');
const {REST } = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");
const { Client, Collection, Events, IntentsBitField, Intents } = require('discord.js');
const { TOKEN, clientId } = require("./config.json");
const { Player } = require("discord-player");


const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates);

const client = new Client({ intents: myIntents });
client.commands = new Collection();

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');

const folder = __dirname + "/commands/"

const files = fs.readdirSync(folder);
        files.filter(f => fs.statSync(folder + f).isDirectory())
            .forEach(nested => fs.readdirSync(folder + nested).forEach(f => files.push(nested + '/' + f)));
        const jsFiles = files.filter(f => f.endsWith('.js'));

const commandFiles = jsFiles;

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}




client.player = new Player(client, {
	ytdlOptions:{
	  quality: "highestaudio",
	  highWaterMark: 1 << 25
	}
  });

client.on("ready", () => {
	const guild_ids = client.guilds.cache.map(guild => guild);

	const rest = new REST({version: "9"}).setToken(TOKEN);

	for (const guildId of guild_ids)
	{
		rest.get(Routes.applicationGuildCommands(clientId, guildId.id))
		.then(data => {
			const promises = [];
			for (const command of data) {
				const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId.id)}/${command.id}`;
				promises.push(rest.delete(deleteUrl));
			}
			
		 	console.log(`Reset commands for ${guildId.id}, Name of Guild: ${guildId.name}`)

			return Promise.all(promises);
		});

		rest.put(Routes.applicationGuildCommands(clientId, guildId.id), {
			body: commands
		})
		.then(() => console.log(`Added commands to ${guildId.id}, Name of Guild: ${guildId.name}`))
		.catch(console.error);
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute({client, interaction});
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});




client.login(TOKEN);
