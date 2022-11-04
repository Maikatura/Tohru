const { SlashCommandBuilder } = require('discord.js');

module.exports = {
   
  data: new SlashCommandBuilder().setName('example').setDescription('Hi this is just a example command!'),
  async execute(interaction) {

    await interaction.reply(`This is a example :D and the one that uses my bot havn't removed this one yet`);
  },
}