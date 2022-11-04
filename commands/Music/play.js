const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder  } = require("discord.js");
const { QueryType } = require("discord-player");
 
module.exports = {
   
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song.')
    .addStringOption(option => 
            option
                .setName("song")
                .setDescription("A song url that dont(nt) work with YouTube")
                .setRequired(true)
    ),

  execute: async ({client, interaction}) => {


    if (!interaction.member.voice.channel){
        await interaction.reply("You must be in a voice channel");
        return;
    }

    const queue = await client.player.createQueue(interaction.guild);

    if (!queue.connection) await queue.connect(interaction.member.voice.channel);

    let url = interaction.options.getString("song");

    const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
    })

    if (result.tracks.length === 0){
        await interaction.reply("No songs with that url");
        return;
    }


    const song = result.tracks[0];
    await queue.addTrack(song);

    if (!queue.playing) await queue.play();


    let embed = new EmbedBuilder();

    embed
        .setDescription(`Added **[${song.title}](${song.url})** to the queue`)
        .setThumbnail(song.thumbnail)
        .setFooter({text: `Duration: ${song.duration}`, iconURL: 'https://i.imgur.com/nNf0fSx.jpeg'});

    await interaction.reply({
      embeds: [embed]
    });

  },
}