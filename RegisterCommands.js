const path = require('node:path');
const fs = require('fs');



module.exports.generateCommands = (client, commands) => {


    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(__dirname, 'commands');

    const folder = __dirname + "/commands/";

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
        }
        else {
            let scriptName = file.split("/").pop();
            let commandName = scriptName.split(".")[0];

            client.commands.set(commandName.toLowerCase(), command);
            console.log("Command Loaded: " + commandName);
        }
    }

}


