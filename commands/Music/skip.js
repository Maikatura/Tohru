const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "skip",
  description: "Skip the current song.",
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

      const currentSong = queue.current;

      queue.skip();

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Skipped **${currentSong.title}**`)
            .setThumbnail(currentSong.thumbnail)
        ]
      });
    }
  }
}