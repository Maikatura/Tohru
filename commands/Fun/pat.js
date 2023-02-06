const Discord = require("discord.js");
const fs = require("fs");
const path = require('path')
const { SlashCommandBuilder } = require('discord.js');

module.exports = {

  name: "pat",
  description: "Give someone a path",
  usage: "",
  aliases: ["path"],
  PMAllowed: false,
  
  execute: async (client, interaction, args) => {

    let dataPath = './commands/Fun/pat.json'
    let json = {}

    json = JSON.stringify(json);

    if (!fs.existsSync(dataPath)) {
      console.log("No File")
      fs.writeFileSync(dataPath, json, (err) => {
        if (!err) {
          console.log('done');
        }
      });
    }


    let reader = fs.readFileSync(dataPath, 'utf8');
    let pats = JSON.parse(reader, 'utf8');

    if (!pats[interaction.guild.id]) pats[interaction.guild.id] = {};
    if (!pats[interaction.guild.id].pats) pats[interaction.guild.id].pats = 0;

    pats[interaction.guild.id].pats++;

    fs.writeFile(dataPath, JSON.stringify(pats), (err) => {
      if (err) console.error(err);
    });




    await interaction.reply(`Thanks for the pat UwU\nTotal pats: ${pats[interaction.guild.id].pats}`);

  },
  SlashCommand: {

    execute: async (client, interaction, args) => {

      let dataPath = './commands/Fun/pat.json'
      let json = {}

      json = JSON.stringify(json);

      if (!fs.existsSync(dataPath)) {
        console.log("No File")
        fs.writeFileSync(dataPath, json, (err) => {
          if (!err) {
            console.log('done');
          }
        });
      }


      let reader = fs.readFileSync(dataPath, 'utf8');
      let pats = JSON.parse(reader, 'utf8');

      if (!pats[interaction.guild.id]) pats[interaction.guild.id] = {};
      if (!pats[interaction.guild.id].pats) pats[interaction.guild.id].pats = 0;

      pats[interaction.guild.id].pats++;

      fs.writeFile(dataPath, JSON.stringify(pats), (err) => {
        if (err) console.error(err);
      });




      await interaction.reply(`Thanks for the pat UwU\nTotal pats: ${pats[interaction.guild.id].pats}`);


    }
  }
}
