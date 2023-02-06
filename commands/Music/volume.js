const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "volume",
  description: "Set the current volume.",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    const guild = client.guilds.cache.get(interaction.guild.id);
    const queue = client.player.getQueue(guild);

      if (!queue) 
      {
        await interaction.reply("There is no song playing.");
        return;
      }

      let volumeValue = args[0];

      queue.setVolume(volumeValue);

      await interaction.reply(`Volume set to ${volumeValue}`);

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
      const guild = client.guilds.cache.get(interaction.guild.id);
      const queue = client.player.getQueue(guild);

      if (!queue) {
        await interaction.reply("There is no song playing.");
        return;
      }

      let volumeValue = interaction.options.getString("value");

      queue.setVolume(volumeValue);

      await interaction.reply(`Volume set to ${volumeValue}`);

    }
  }
}