const Discord = require('discord.js');
const { Client, Collection, Events, IntentsBitField, Intents } = require('discord.js');
const { TOKEN, clientId, Prefix } = require("./config/config.json");
const { Player } = require("discord-player");
const { RegisterBot } = require('./RegisterBot');

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildVoiceStates);

const client = new Discord.Client({ intents: myIntents });
client.commands = new Collection();

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25,
		
	},
	autoRegisterExtractor: true
});

const commands = [];
RegisterBot(client, commands);

client.login(TOKEN);
