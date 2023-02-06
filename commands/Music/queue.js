const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "queue",
  description: "queue thingi",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    const guild = client.guilds.cache.get(interaction.guild.id)
    const queue = client.player.getQueue(guild);

    if (!queue || !queue.playing) 
    {
      await interaction.reply("There is no song playing. Error 1");
      return;
    }

    const queueString = GetSongList(queue)
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
  },
  SlashCommand: {


    execute: async (client, interaction, args) => {
      const guild = client.guilds.cache.get(interaction.guild.id)
      const queue = client.player.getQueue(guild);

      if (!queue || !queue.playing) 
      {
        await interaction.reply("There is no song playing.");
        return;
      }

      const queueString = GetSongList(queue);

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

function GetSongList(queue){
  return queue.tracks.slice(0, 10).map((song, i) => {
    return `${i + 1}) [${song.duration}] ${song.title} - <@${song.requestedBy.id}>`;
  }).join("\n");
}