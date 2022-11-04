const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder  } = require("discord.js");
const { QueryType } = require("discord-player");
 
module.exports = {
   
  name: "pause",
  description: "Pause the current song.",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    await interaction.reply("Dont work yet")
  
  },
  SlashCommand: {
    
  execute: async (client, interaction, args) => {

    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
        await interaction.reply("There is no song playing.");
        return;
    }

    queue.setPaused(true);

    await interaction.reply("Song has been paused");

  }
},
}