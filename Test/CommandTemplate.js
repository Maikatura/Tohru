const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "volume",
  description: "Set the current volume.",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    
    await interaction.reply("Test command");

  },
  SlashCommand: {

    options: [
      {
        name: "value",
        description: "Set play volume",
        type: 3,
        required: true,
      },
    ],

    execute: async (client, interaction, args) => {
      

      await interaction.reply("Test command");

    }
  }
}