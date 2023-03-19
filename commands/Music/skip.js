const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "skip",
  description: "Skip the current song.",
  usage: "",
  aliases: ["conf"],
  PMAllowed: false,

  execute: async (client, interaction, args) => {

    const guild = interaction.guild;
    const queue = client.player.getQueue(guild);

      if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
      const currentTrack = queue.current;
      const success = queue.skip();
      return void interaction.reply({
          content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
      });

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {

      const guild = interaction.guild;
      const queue = client.player.getQueue(guild);

      if (!queue || !queue.playing) return void interaction.reply({ content: '❌ | No music is being played!' });
      const currentTrack = queue.current;
      const success = queue.skip();
      return void interaction.reply({
          content: success ? `✅ | Skipped **${currentTrack}**!` : '❌ | Something went wrong!'
      });
      
    }
  }
}