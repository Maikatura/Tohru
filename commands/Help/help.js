const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: "help",
  description: "Give you some help?",
  usage: "",
  aliases: ["path"],

  execute: async (client, interaction, args) => {

    await interaction.reply("Dont work yet")

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {

      



      await interaction.reply(`Help? modCheck`);


    }
  }
  
}