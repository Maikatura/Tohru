const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "skip",
  description: "Skip the current song.",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    const queue = client.player.getQueue(interaction.guild);

    if (!queue) 
    {
      await interaction.reply("There is no song playing.");
      return;
    }

    const currentSong = queue.current;

    if (!currentSong) 
    {
      await interaction.reply("There is no song playing.");
      return;
    }

    queue.skip();

    await interaction.reply(`❌ | Skipping **${currentSong.title}**!`);

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {

      const queue = client.player.getQueue(interaction.guild);

      if (!queue) 
      {
        await interaction.reply("There is no song playing.");
        return;
      }

      const currentSong = queue.current;

      if (!currentSong) 
      {
        await interaction.reply("There is no song playing.");
        return;
      }

      queue.skip();

      await interaction.reply(`❌ | Skipping **${currentSong.title}**!`);
    }
  }
}