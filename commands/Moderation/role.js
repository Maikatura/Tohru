const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');

module.exports = {

  name: "role",
  description: "Add a role to a bot message",
  usage: "",
  aliases: ["role"],

  execute: async (client, interaction, args) => {

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('primary')
            .setLabel('Click me!')
            .setStyle(ButtonStyle.Primary),
    );

    await interaction.reply({ content: 'I think you should,', components: [row] });

  },
  SlashCommand: {


    execute: async (client, interaction, args) => {
      
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Click me!')
					.setStyle(ButtonStyle.Primary),
			);

		await interaction.reply({ content: 'I think you should,', components: [row] });

    }
  }
}