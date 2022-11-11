const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "leave",
  description: "leave the current voice channel.",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    const queue = client.player.getQueue(interaction.guild);

      if (!queue) {
        await interaction.reply("There is no song playing.");
        return;
      }

      queue.destroy();

      await interaction.reply("I left the voice channel")

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {
      const queue = client.player.getQueue(interaction.guild);

      if (!queue) {
        await interaction.reply("There is no song playing.");
        return;
      }

      queue.destroy();

      await interaction.reply("I left the voice channel")

    }
  }
}