const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder  } = require("discord.js");
const { QueryType } = require("discord-player");
 
module.exports = {
   
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skips the current song.'),

  execute: async ({client, interaction}) => {

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
    })

  },
}