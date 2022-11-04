const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder  } = require("discord.js");
const { QueryType } = require("discord-player");
 
module.exports = {
   
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leave and stop playing music.'),

  execute: async ({client, interaction}) => {

    const queue = client.player.getQueue(interaction.guild);

    if (!queue) {
        await interaction.reply("There is no song playing.");
        return;
    }

    queue.destory();

    await interaction.reply("I left the voice channel")

  },
}