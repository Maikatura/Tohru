const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "volume",
  description: "Set the current volume.",
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

      let volumeValue = interaction.options.getString("value");

      queue.setVolume(volumeValue);

      await interaction.reply(`Volume set to ${volumeValue}`);

    }
  }
}