const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "play",
  description: "Play a song.",
  usage: "",
  aliases: ["p"],
  PMAllowed: false,

  execute: async (client, interaction, args) => {


    if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

    const guild = client.guilds.cache.get(interaction.guild.id);
    const channel = guild.channels.cache.get(interaction.channel.id);
    const query = args.join(' ');


    if (query.includes("spotify")){
      return await interaction.reply("Sorry spotify is a little broken rn!")
    }

    const searchResult = await client.player
        .search(query, {
            requestedBy: interaction.author,
            searchEngine: QueryType.AUTO
        })
        .catch(() => {
            console.log('he');
        });
    if (!searchResult || !searchResult.tracks.length) return void interaction.reply({ content: 'No results were found!' });

    const queue = await client.player.createQueue(guild, {
        ytdlOptions: {
            filter: 'audioonly',
            highWaterMark: 1 << 30,
            dlChunkSize: 3,
        },
        autoRegisterExtractor: true,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000,
        leaveOnStop: true,
        leaveOnStopCooldown: 300000,
        autoSelfDeaf: true,
        metadata: {
          channel: interaction.channel
      }
    });

    const member = guild.members.cache.get(interaction.author.id) ?? await guild.members.fetch(interaction.author.id);
    try {
        if (!queue.connection) await queue.connect(member.voice.channel);
    } catch {
        void client.player.deleteQueue(guild);
        return void interaction.reply({ content: 'Could not join your voice channel!' });
    }

    await interaction.reply({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) 
    {
      console.log("Play");
      await queue.play();
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
     
      if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
      if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

      const guild = client.guilds.cache.get(interaction.guild.id);
      const channel = guild.channels.cache.get(interaction.channel.id);
      const query = interaction.options.getString("song");
  
      if (query.includes("spotify")){
        return await interaction.reply("Sorry spotify is a little broken rn!")
      }
  
      const searchResult = await client.player
          .search(query, {
              requestedBy: interaction.user,
              searchEngine: QueryType.AUTO
          })
          .catch(() => {
              console.log('he');
          });
      if (!searchResult || !searchResult.tracks.length) return void interaction.reply({ content: 'No results were found!' });
  
      const queue = await client.player.createQueue(guild, {
          ytdlOptions: {
              filter: 'audioonly',
              highWaterMark: 1 << 30,
              dlChunkSize: 3,
          },
          autoRegisterExtractor: true,
          leaveOnEnd: true,
          leaveOnEndCooldown: 300000,
          leaveOnStop: true,
          leaveOnStopCooldown: 300000,
          autoSelfDeaf: true,
          metadata: {
            channel: interaction.channel
        }
      });
  
      const member = guild.members.cache.get(interaction.user.id) ?? await guild.members.fetch(interaction.user.id);
      try {
          if (!queue.connection) await queue.connect(member.voice.channel);
      } catch {
          void client.player.deleteQueue(guild);
          return void interaction.reply({ content: 'Could not join your voice channel!' });
      }
  
      await interaction.reply({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
      if (!queue.playing) await queue.play();

    }
  }
}