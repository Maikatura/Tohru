const { SlashCommandBuilder } = require('discord.js');

module.exports = {
   
  data: new SlashCommandBuilder().setName('help').setDescription('Need some help'),
  async execute(client, interaction) {

    await interaction.reply("all I can do is `/pat` for now");
  },
}