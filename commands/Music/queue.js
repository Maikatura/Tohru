const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "queue",
  description: "queue thingi",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {



    await interaction.reply("Pog");

  },
  SlashCommand: {


    execute: async (client, interaction, args) => {
      const queue = client.player.getQueue(interaction.guild);

      if (!queue || !queue.playing) {
        await interaction.reply("There is no song playing.");
        return;
      }

      const queueString = queue.tracks.slice(0, 10).map((song, i) => {
        return `${i + 1}) [${song.duration}] ${song.title} - <@${song.requestedBy.id}>`;
      }).join("\n");


      const currentSong = queue.current;

      await interaction.reply(
        {
          embeds:
            [
              new EmbedBuilder()
                .setDescription(`**Currenly Playing:**\n ${currentSong.title} - <@${currentSong.requestedBy.id}>\n\n**Queue:**\n${queueString}`)
                .setThumbnail(currentSong.thumbnail)
            ]
        }
      );
    }
  }
}