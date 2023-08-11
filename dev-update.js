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
    .setName("dev-update")
    .setDescription("Sends a developer update."),

  async execute(interaction, client, message) {
      
    if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
    const { guildId, options, guild, member, user } = interaction;

    const modal = new ModalBuilder()
        .setTitle("Development Update")
        .setCustomId("devupd");
        
        const add = new TextInputBuilder()
        .setCustomId("add")
        .setRequired(true)
        .setLabel("Please provide the new additions.")
        .setStyle(TextInputStyle.Paragraph);

        const sub = new TextInputBuilder()
        .setCustomId("sub")
        .setRequired(true)
        .setLabel("Please provide the removals.")
        .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(add);
        const secondActionRow = new ActionRowBuilder().addComponents(sub);
        
        modal.addComponents(firstActionRow, secondActionRow);
        await interaction.showModal(modal);
      }
  },
};
