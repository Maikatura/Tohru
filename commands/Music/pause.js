const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder  } = require("discord.js");
const { QueryType } = require("discord-player");
 
module.exports = {
   
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('pause the current song.'),

  execute: async ({client, interaction}) => {

    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
        await interaction.reply("There is no song playing.");
        return;
    }

    queue.setPaused(true);

    await interaction.reply("Song has been paused");

  },
}