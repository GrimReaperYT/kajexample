const Discord = require("discord.js");
const { Client, EmbedBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require ("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName("request")
    .setDescription("Shows information about the Infinite Designs bot.")
    .addSubcommand(subcommand => subcommand
        .setName("roles")
        .setDescription("Request roles.")
        .addUserOption(option =>
          option.setName("requestee")
          .setDescription("Provide User who you're requesting for.")
          .setRequired(true)
          ),
    )
    .addSubcommand(subcommand => subcommand
        .setName("loa")
        .setDescription("Request an LOA.")
    ),

    
  async execute(interaction, client, message) {


    const { guildId, options, guild, member, user } = interaction;

    const sub = options.getSubcommand(["roles", "loa"]);



    switch (sub) {
        case "roles":

      if (interaction.channel.id === "1082193132088742018") { //Reborn main discord

        const mainModal = new ModalBuilder()
        .setTitle("Infinite Designs Request Roles")
        .setCustomId("main-requestroles");
        
        const mainRolesNeeded = new TextInputBuilder()
        .setCustomId("roles-needed")
        .setRequired(true)
        .setLabel("Please provide the roles you need.")
        .setStyle(TextInputStyle.Short);

        const mainRolesRemoved = new TextInputBuilder()
        .setCustomId("roles-removed")
        .setRequired(true)
        .setLabel("Please provide the roles you need removed.")
        .setStyle(TextInputStyle.Short);

        const mainApprovedBy = new TextInputBuilder()
        .setCustomId("approved-by")
        .setRequired(true)
        .setLabel("Please provide the person who approves this.")
        .setStyle(TextInputStyle.Short);


        const mainFirstActionRow = new ActionRowBuilder().addComponents(mainRolesNeeded);
        const mainSecondActionRow = new ActionRowBuilder().addComponents(mainRolesRemoved);
        const mainThirdActionRow = new ActionRowBuilder().addComponents(mainApprovedBy);

        mainModal.addComponents(mainFirstActionRow, mainSecondActionRow, mainThirdActionRow);
        await interaction.showModal(mainModal);

      } else if (interaction.channel.id === "1014653414547927086" || interaction.channel.id === "1033916478807879757" || interaction.channel.id === "1064114503970721812") { //leo, fire, civ

        const deptModal = new ModalBuilder()
        .setTitle("Law Enforcement Request Roles")
        .setCustomId("dept-requestroles");
        
        const deptRank = new TextInputBuilder()
        .setCustomId("rank")
        .setRequired(true)
        .setLabel("Please provide your current rank.")
        .setStyle(TextInputStyle.Short);

        const deptBadge = new TextInputBuilder()
        .setCustomId("callsign")
        .setRequired(true)
        .setLabel("Please provide your current callsign.")
        .setStyle(TextInputStyle.Short);

        const deptRolesNeeded = new TextInputBuilder()
        .setCustomId("roles-needed")
        .setRequired(true)
        .setLabel("Please provide the roles you need.")
        .setStyle(TextInputStyle.Short);

        const deptRolesRemoved = new TextInputBuilder()
        .setCustomId("roles-removed")
        .setRequired(true)
        .setLabel("Please provide the roles you need removed.")
        .setStyle(TextInputStyle.Short);

        const deptApprovedBy = new TextInputBuilder()
        .setCustomId("approved-by")
        .setRequired(true)
        .setLabel("Please provide the person who approves this.")
        .setStyle(TextInputStyle.Short);


        const deptFirstActionRow = new ActionRowBuilder().addComponents(deptRank);
        const deptSecondActionRow = new ActionRowBuilder().addComponents(deptBadge);
        const deptThirdActionRow = new ActionRowBuilder().addComponents(deptRolesNeeded);
        const deptFourthActionRow = new ActionRowBuilder().addComponents(deptRolesRemoved);
        const deptFifthActionRow = new ActionRowBuilder().addComponents(deptApprovedBy);

        deptModal.addComponents(deptFirstActionRow, deptSecondActionRow, deptThirdActionRow, deptFourthActionRow, deptFifthActionRow);
        await interaction.showModal(deptModal);

      } else {
        interaction.reply({ content: "This command can only be done in role requests channels.", ephemeral: true})
      }
      break;
      case "loa":

      if (interaction.channel.id === "1014653917113622574" || interaction.channel.id === "1014653415126732866" || interaction.channel.id === "1033916478807879759" || interaction.channel.id === "1064115361206784041") { //main, leo, fire, civ

        const loaModal = new ModalBuilder()
        .setTitle("Infinite Designs Request LOA")
        .setCustomId("request-loa");
        
        const loaRank = new TextInputBuilder()
        .setCustomId("rank")
        .setRequired(true)
        .setLabel("Please provide your current rank.")
        .setStyle(TextInputStyle.Short);

        const loaReason = new TextInputBuilder()
        .setCustomId("reason")
        .setRequired(true)
        .setLabel("Please provide the reason for your LOA.")
        .setStyle(TextInputStyle.Short);

        const startDate = new TextInputBuilder()
        .setCustomId("start-date")
        .setRequired(true)
        .setLabel("Please provide the start date.")
        .setStyle(TextInputStyle.Short);

        const endDate = new TextInputBuilder()
        .setCustomId("end-date")
        .setRequired(true)
        .setLabel("Please provide the end date.")
        .setStyle(TextInputStyle.Short);


        const loaRankRow = new ActionRowBuilder().addComponents(loaRank);
        const loaReasonRow = new ActionRowBuilder().addComponents(loaReason);
        const loaStartRow = new ActionRowBuilder().addComponents(startDate);
        const loaEndRow = new ActionRowBuilder().addComponents(endDate);

        loaModal.addComponents(loaRankRow, loaReasonRow, loaStartRow, loaEndRow);
        await interaction.showModal(loaModal);

      } else {
        interaction.reply({ content: "This command can only be done in LOA request channels.", ephemeral: true})
      }

      break;
    }
    
  },
  
};
