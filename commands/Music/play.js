const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "play",
  description: "Play a song.",
  usage: "",
  aliases: ["p"],

  execute: async (client, interaction, args) => {

    if (!interaction.member.voice.channel) 
    {
      await interaction.reply("You must be in a voice channel");
      return;
    }

    const queue = await client.player.createQueue(interaction.guild, {
      metadata: {
        channel: interaction.channel
      }
    });

    if (!queue.connection) await queue.connect(interaction.member.voice.channel);

    let url = args.join(' ');

    try 
    {
      if (!queue.connection) 
      {
        await queue.connect(interaction.member.voice.channel);
      }
    } 
    catch 
    {
      queue.destroy();
      return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }

    let searchType = QueryType.AUTO;

      if (url.includes("list="))
      {
        searchType = QueryType.YOUTUBE_PLAYLIST;
      }
  
      let result;

      if (searchType === QueryType.YOUTUBE_PLAYLIST)
      {
        let searchResult = await client.player.search(url, {
          requestedBy: interaction.author,
          searchEngine: searchType
        });

        if (searchResult.tracks.length === 0)
        {
          await interaction.reply("Sorry didn't find anything");
          return;
        }

        const playlist = searchResult.tracks;


        result = searchResult.playlist;

        for (let i = 0; i < playlist.length; i++) 
        {
          await queue.addTrack(playlist[i]);
        } 
      
      

      }
      else
      {
        
        result = await client.player.search(url, {
          requestedBy: interaction.author,
          searchEngine: searchType
        }).then(x => x.tracks[0]);

        if (!result)
        {
          await interaction.reply("Sorry didn't find anything");
          return;
        } 
        await queue.addTrack(result);

        //await interaction.reply(`🎶 | **${result.title}** added to the queue`);
      }

      if (!queue.playing) await queue.play();

      await interaction.reply(`🎶 | **${result.title}** added to the queue`);
      
      queue.options = {
        ytdlOptions: {
          quality: "highestaudio",
          highWaterMark: 1 << 25,
        
        },
        autoRegisterExtractor: true,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000,
        leaveOnStop: true,
        leaveOnStopCooldown: 300000,
        autoSelfDeaf: true,
      }
      
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

      const queue = await client.player.createQueue(interaction.guild, {
        metadata: {
          channel: interaction.channel
        }
      });

      

      if (!queue.connection) await queue.connect(interaction.member.voice.channel);




      let url = interaction.options.getString("song");


      try 
      {
        if (!queue.connection) 
        {
          await queue.connect(interaction.member.voice.channel);
        }
      } 
      catch 
      {
        queue.destroy();
        return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
      }

      let searchType = QueryType.AUTO;

      if (url.includes("list="))
      {
        searchType = QueryType.YOUTUBE_PLAYLIST;
      }
  
      let result;

      if (searchType === QueryType.YOUTUBE_PLAYLIST)
      {
        let searchResult = await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: searchType
        });

        if (searchResult.tracks.length === 0)
        {
          await interaction.reply("Sorry didn't find anything");
          return;
        }

        const playlist = searchResult.tracks;


        result = searchResult.playlist;

        for (let i = 0; i < playlist.length; i++) 
        {
          await queue.addTrack(playlist[i]);
        } 
      
      

      }
      else
      {
        
        result = await client.player.search(url, {
          requestedBy: interaction.user,
          searchEngine: searchType
        }).then(x => x.tracks[0]);

        if (!result)
        {
          await interaction.reply("Sorry didn't find anything");
          return;
        } 
        await queue.addTrack(result);

        //await interaction.reply(`🎶 | **${result.title}** added to the queue`);
      }


      

      if (!queue.playing) await queue.play();

      await interaction.reply(`🎶 | **${result.title}** added to the queue`);


      queue.options = {
        ytdlOptions: {
          quality: "highestaudio",
          highWaterMark: 1 << 25,
        
        },
        autoRegisterExtractor: true,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000,
        leaveOnStop: true,
        leaveOnStopCooldown: 300000,
        autoSelfDeaf: true,
      }
    }
  }
}