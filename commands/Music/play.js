const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "play",
  description: "Play a song.",
  usage: "",
  aliases: ["conf"],

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

    let url = args.join(' ');

    console.log(url);

    try {
      if (!queue.connection) await queue.connect(interaction.member.voice.channel);
    } catch {
      queue.destroy();
      return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
    }


    const track = await client.player.search(url, {
      requestedBy: interaction.author.id
    }).then(x => x.tracks[0]);

    if (!track) return await interaction.reply("Sorry didn't find anything");

    await queue.addTrack(track);

    if (!queue.playing) await queue.play();

    await interaction.reply(`🎶 | **${track.title}** added to the queue`);

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


      try {
        if (!queue.connection) await queue.connect(interaction.member.voice.channel);
      } catch {
        queue.destroy();
        return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
      }


      const track = await client.player.search(url, {
        requestedBy: interaction.user
      }).then(x => x.tracks[0]);

      if (!track) return await interaction.reply("Sorry didn't find anything");

      await queue.addTrack(track);

      if (!queue.playing) await queue.play();

      await interaction.reply(`🎶 | **${track.title}** added to the queue`);

    }
  }
}