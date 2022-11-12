const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "info",
  description: "Some info about me",
  usage: "",
  aliases: ["path"],

  execute: async (client, interaction, args) => {

    await interaction.reply({
        embeds:
          [
            await CreateEmbed()
          ]
      });

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {

        let embed = new EmbedBuilder();

        interaction.reply({
            embeds:
              [
                await CreateEmbed()
              ]
          });


    }
  }
  
}

function CreateEmbed()
{
    embed = new EmbedBuilder();

    let message = `I was made by someone called Maikatura!\n`;
    message += `I can be found [here](https://github.com/Maikatura/Tohru)\n`
    message += `Read bot ToS [here](https://github.com/Maikatura/Tohru/blob/main/docs/tos.md)!`

    embed.setDescription(message);

    return embed;
}
