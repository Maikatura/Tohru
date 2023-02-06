const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {

  name: "invite",
  description: "Invite me.",
  usage: "",
  aliases: ["inv"],
  PMAllowed: true,

  execute: async (client, interaction, args) => {

    await interaction.reply(`https://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=${client.user.id}`);
  },
  SlashCommand: {

    execute: async (client, interaction, args) => {
      
        await interaction.reply(`https://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=${client.user.id}`);
    }
  }
}