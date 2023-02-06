const { SlashCommandBuilder } = require('discord.js');
const { Prefix } = require('../../config/config.json')
const mdtable = require('mdtable');

module.exports = {
  name: "help",
  description: "Give you some help?",
  usage: "",
  aliases: ["path"],
  PMAllowed: true,

  execute: async (client, interaction, args) => {

    const tableData = {
      header: ['Name', 'Description', 'Options'],
      alignment: ['L', 'C', 'R'],
      rows: []
    }

    const tableSettings = {
      borders: true,
      padding: 1
    }

    
  
    for (let [key, value] of client.commands) {
      tableData.rows.push([`/${value.name}`, value.description, value.SlashCommand.options?.map((o) => `\\<${o.name}>`).join(' ') || '']);
    }
   

    interaction.author.send("```" + mdtable(tableData, tableSettings) + "```");


    await interaction.reply({ content: `Help? modCheck`, ephemeral: true });

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {

      const tableData = {
        header: ['Name', 'Description', 'Options'],
        alignment: ['L', 'C', 'R'],
        rows: []
      }
  
      const tableSettings = {
        borders: true,
        padding: 1
      }
  
      for (let [key, value] of client.commands) {
        tableData.rows.push([`/${value.name}`, value.description, value.SlashCommand.options?.map((o) => `\\<${o.name}>`).join(' ') || '']);
      }
     
      interaction.member.send("```" + mdtable(tableData, tableSettings) + "```");

      await interaction.reply({ content: `Help? modCheck`, ephemeral: true });
    }
  }

}