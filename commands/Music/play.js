const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "play",
  description: "Play a song.",
  usage: "",
  aliases: ["conf"],

  execute: async (client, interaction, args) => {

    await interaction.reply("Dont work yet")
  
  },
  SlashCommand: {
    
        options: [
          {
            name: "song",
            description: "a song that you want to play.",
            type: 3,
            required: true,
          },
        ],

    execute: async (client, interaction, args) => {
      if (!interaction.member.voice.channel) {
        await interaction.reply("You must be in a voice channel");
        return;
      }
  
      const queue = await client.player.createQueue(interaction.guild);
  
      if (!queue.connection) await queue.connect(interaction.member.voice.channel);
  
      let url = interaction.options.getString("song");
  

    

      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      })
  
      if (result.tracks.length === 0) {

        await interaction.reply("No song(s) found");
    
        return;
      }
  
      let embed = new EmbedBuilder();
      
      
        const song = result.tracks;
        await queue.addTracks(song);

        embed
        .setDescription(`Added **[${song[0].title}](${song[0].url})** to the queue`)
        .setThumbnail(song[0].thumbnail)
        .setFooter({ text: `Duration: ${song[0].duration}`, iconURL: 'https://i.imgur.com/nNf0fSx.jpeg' });


  
      if (!queue.playing) await queue.play();

      await interaction.reply({
        embeds: [embed]
      }); 
  
    }
  }
}