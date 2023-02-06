const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Events } = require('discord.js');
const { registerPlayerEvents } = require('./events');
const { generateDocs } = require('./docs');
const { generateCommands } = require('./RegisterCommands');
const { TOKEN, clientId, Prefix } = require("./config/config.json");

module.exports.RegisterBot = (client, commands) => {

    client.on(Events.Error, (error) => console.log(error));

    client.on(Events.ClientReady, async () => {
        
        await generateCommands(client, commands);
        await registerPlayerEvents(client.player);
        
        const guild_ids = client.guilds.cache.map(guild => guild);
        
        const rest = new REST({ version: "9" }).setToken(TOKEN);
        
        for (const guildId of guild_ids) {
            rest.put(Routes.applicationGuildCommands(clientId, guildId.id), {
                body: commands
            })
            .then(() => console.log(`Added commands to ${guildId.id}, Name of Guild: ${guildId.name}`))
            .catch(console.error);
        }
        
        
        console.log('Generating docs...');
        await generateDocs(client.commands);
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on(Events.GuildCreate, () => {

        const guild_ids = client.guilds.cache.map(guild => guild);
    
        const rest = new REST({ version: "9" }).setToken(TOKEN);
    
        for (const guildId of guild_ids) {
            rest.put(Routes.applicationGuildCommands(clientId, guildId.id), {
                body: commands
            })
                .then(() => console.log(`Added commands to ${guildId.id}, Name of Guild: ${guildId.name}`))
                .catch(console.error);
        }
    
    })
    
    client.on(Events.MessageCreate, async (interaction) => {
    
        if (interaction.author.bot === true) return;
    
        const channel = await client.channels.cache.get(interaction.channelId);
    
        let message = await channel.messages.fetch({ limit: 1 })
            .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
    
        let argsTemp = message.content.split(" ");
        let cmd = argsTemp[0].toLowerCase();
    
        let realCmd = cmd.replace(Prefix, '');
    
        const command = client.commands.get(realCmd.toLowerCase());
        let args = argsTemp.join(' ').replace(argsTemp[0] + ' ', '').split(' ');
    
    
        if (!command) {
            console.error(`No command matching ${realCmd} was found.`);
            return;
        }
    
        try {
            if (command && command.execute) {
                command.execute(client, interaction, args);
            }
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
    
    client.on(Events.InteractionCreate, interaction => {
    
        if (!interaction.isButton()) return;
        console.log(interaction);
    
        interaction.reply("Hi");
    
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
    
            if (!command.PMAllowed && interaction.channel.type === 'dm'){
                await interaction.reply("That command cant be uses in DM")
            }
            else if (command.SlashCommand && command.execute) {
                command.SlashCommand.execute(client, interaction, args);
            }
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });



};