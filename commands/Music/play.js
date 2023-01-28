const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "play",
  description: "Play a song.",
  usage: "",
  aliases: ["p"],

  execute: async (client, interaction, args) => {

    const guild = interaction.guild;
    const channel = interaction.channel;
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
            dlChunkSize: 0,
        },
        autoRegisterExtractor: true,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000,
        leaveOnStop: true,
        leaveOnStopCooldown: 300000,
        autoSelfDeaf: true,
        metadata: channel
    });

    const member = guild.members.cache.get(interaction.author.id) ?? await guild.members.fetch(interaction.author.id);
    try {
        if (!queue.connection) await queue.connect(member.voice.channel);
    } catch {
        void client.player.deleteQueue(ctx.guildID);
        return void interaction.reply({ content: 'Could not join your voice channel!' });
    }

    await interaction.reply({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
    searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
    if (!queue.playing) await queue.play();


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
     
      const guild = interaction.guild;
      const channel = interaction.channel;
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
              dlChunkSize: 0,
          },
          autoRegisterExtractor: true,
          leaveOnEnd: true,
          leaveOnEndCooldown: 300000,
          leaveOnStop: true,
          leaveOnStopCooldown: 300000,
          autoSelfDeaf: true,
          metadata: channel
      });
  
      const member = guild.members.cache.get(interaction.user.id) ?? await guild.members.fetch(interaction.user.id);
      try {
          if (!queue.connection) await queue.connect(member.voice.channel);
      } catch {
          void client.player.deleteQueue(ctx.guildID);
          return void interaction.reply({ content: 'Could not join your voice channel!' });
      }
  
      await interaction.reply({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
      searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
      if (!queue.playing) await queue.play();

    }
  }
}