const Discord = require("discord.js");
const moment = require("moment");
const config = require("../../config.json");
const {
  Client,
  EmbedBuilder,
  SlashCommandBuilder,
  CommandInteraction,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announce")
    .setDescription("Sends an announcement."),

  async execute(interaction, client, message) {
      
    if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
    const { guildId, options, guild, member, user } = interaction;

    const modal = new ModalBuilder()
        .setTitle("Announcement Creator")
        .setCustomId("announce");
    
        const title = new TextInputBuilder()
        .setCustomId("title")
        .setRequired(true)
        .setLabel("Please provide the title.")
        .setStyle(TextInputStyle.Short);

        const desc = new TextInputBuilder()
        .setCustomId("desc")
        .setRequired(true)
        .setLabel("Please provide the description.")
        .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(desc);
        const scndActionRow = new ActionRowBuilder().addComponents(title);
        
        modal.addComponents(scndActionRow, firstActionRow);
        await interaction.showModal(modal);
      }
  },
};
