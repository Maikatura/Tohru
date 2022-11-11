const fs = require('fs');
const path = require('node:path');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Discord = require('discord.js');
const { Client, Collection, Events, IntentsBitField, Intents } = require('discord.js');
const { TOKEN, clientId, Prefix } = require("./config.json");
const { Player } = require("discord-player");


const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates);

const client = new Discord.Client({ intents: myIntents });
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

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	let dataStuff = {
        name: command.name,
        description: command.description,
        options: command.SlashCommand.options,
      };

	commands.push(dataStuff);
}

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if (!command.name || !command.description || !command.execute) {
		console.log("Failed");

		
	} else {


		let scriptName = file.split("/").pop();
		let commandName = scriptName.split(".")[0];

		client.commands.set(commandName.toLowerCase(), command);
		console.log("Command Loaded: " + commandName);
	}
}

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
	
	}
});

client.player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))

client.on(Events.Error, (error) => console.log(error));

client.player.on("error", (error) => {console.log(error)});
client.player.on("connectionError", (error) => {console.log(error)});

client.on("ready", () => {

	const guild_ids = client.guilds.cache.map(guild => guild);

	const rest = new REST({version: "9"}).setToken(TOKEN);

	for (const guildId of guild_ids)
	{ 
		rest.put(Routes.applicationGuildCommands(clientId, guildId.id), {
			body: commands
		})
		.then(() => console.log(`Added commands to ${guildId.id}, Name of Guild: ${guildId.name}`))
		.catch(console.error);
	}
	// client.guilds.cache.forEach((guild) => {
	// 	require("./utils/RegisterSlashCommands")(client, guild.id);
	// });



});

client.on(Events.MessageCreate, async (interaction) => {

	if(interaction.author.bot === true) return;

	const channel = await client.channels.cache.get(interaction.channelId);
	
	let message = await channel.messages
    .fetch({ limit: 1 })
    .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

	
	let argsTemp = message.content.split(" ");
	let cmd = argsTemp[0].toLowerCase();

	let realCmd = cmd.replace(Prefix, '');
	
	const command = client.commands.get(realCmd.toLowerCase());
	let args = argsTemp.join(' ').replace(argsTemp[0] + ' ', '').split(' ');
	

	if (!command) 
	{
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    try 
	{
		if (command && command.execute)
		{
			command.execute(client, interaction, args);
		}
	} 
	catch (error) 
	{
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on(Events.InteractionCreate, async (interaction) => {

	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName.toLowerCase());
	const args = command.options;

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		if (command.SlashCommand && command.execute)
			command.SlashCommand.execute(client, interaction, args);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(TOKEN);
