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
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("infographic")
    .setDescription("Sends an infographic.")
    .addSubcommand(subcommand =>
        subcommand.setName("teams")
          .setDescription("Sends the team infographic.")
    .addStringOption(option =>
        option.setName("staffstatus")
          .setDescription("Provide Status.")
         .setRequired(true)
         .addChoices(
             { name: "OPEN", value: "<:open_1:1097328424827228231><:open_2:1097328426790166659>" },
             { name: "CLOSED", value: "<:closed_1:1097355466323017898><:closed_2:1097355468294344825>" },
           )
)
.addStringOption(option =>
    option.setName("supportstatus")
      .setDescription("Provide Status.")
     .setRequired(true)
     .addChoices(
         { name: "OPEN", value: "<:open_1:1097328424827228231><:open_2:1097328426790166659>" },
         { name: "CLOSED", value: "<:closed_1:1097355466323017898><:closed_2:1097355468294344825>" },
       )
)
    )
    .addSubcommand(subcommand =>
        subcommand.setName("rules")
          .setDescription("Sends the rules infographic.")
    )
    .addSubcommand(subcommand =>
      subcommand.setName("faq")
        .setDescription("Sends the FAQ infographic.")
  )
    .addSubcommand(subcommand =>
        subcommand.setName("information")
          .setDescription("Sends the information infographic.")
     )
     .addSubcommand(subcommand =>
      subcommand.setName("termsofservice")
        .setDescription("Sends the TOS infographic.")
   )
   .addSubcommand(subcommand =>
    subcommand.setName("grimprices")
      .setDescription("Sends Grim's price infographic.")
 )
    ,

  async execute(interaction, client, message) {

    const sub = interaction.options.getSubcommand(["teams", "rules", "information", "faq", "termsofservice", "grimprices"]);

    switch (sub) {

/*
████████╗███████╗░█████╗░███╗░░░███╗░██████╗
╚══██╔══╝██╔════╝██╔══██╗████╗░████║██╔════╝
░░░██║░░░█████╗░░███████║██╔████╔██║╚█████╗░
░░░██║░░░██╔══╝░░██╔══██║██║╚██╔╝██║░╚═══██╗
░░░██║░░░███████╗██║░░██║██║░╚═╝░██║██████╔╝
░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░*/

        case "teams":
      
    if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
    const { guildId, options, guild, member, user } = interaction;

    let deptEmbed = new EmbedBuilder()
    .setColor("#0C2037")
    .setThumbnail("https://i.imgur.com/enzzzWC.png")
    .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs APPLICATIONS** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
    
    <:infinite:1109702627433926716> **Welcome to the Infinite Designs Application Portal!** Here, you can find all of the statuses for each department, whether that be Law Enforcement, or the Staff Team! Along with the statuses of applications, you are able to select an item from the dropdown below and learn more information regarding the department or team that you choose! With that said, we look forward to roleplaying with you and seeing you in one of our departments!
React down below to receive your roles!

> <:infinite:1109702627433926716> **Interested in applying for a department?** It's as easy as selecting one of the many options from the dropdown below, learning more information about the department or team that you selected, then clicking on the "Apply Now" link! The application link will forward you to your default web browser, and to apply it is as easy as connecting your Discord account to the Infinite Designs website!

> <:infinite:1109702627433926716> **Please ensure your answers are honest** to the best of your ability, and make sure you fill out every question with as much detail as possible! Good luck.
`)
    .addFields(
        { name: "\u200b", value: "<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **REBORN DEPARTMENTS** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>" },
        { name: "<:RebornLE:1064840167774507128>  Law Enforcement", value: `${options.getString("lestatus")}`, inline: true},
        { name: "<:RebornFire:1064840499204210780>  Fire Rescue", value: `${options.getString("frstatus")}`, inline: true},
        { name: "<:RebornCivilianOps:1065159158703333436>  Civilian Operations", value: `${options.getString("costatus")}`},
        { name: "\u200b", value: "<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **REBORN TEAMS** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>" },
        { name: "<:RebornStaff:1064840978185330739>  Staff Team", value: `${options.getString("staffstatus")}`, inline: true},
        { name: "<:RebornSupport:1064842528173596782>  Support Team", value: `${options.getString("supportstatus")}`, inline: true},
        { name: "<:RebornDev:1064842526097416252> Development Team", value: `${options.getString("devstatus")}`},
        { name: "<:reborn_mediateam:1097356711062413322> Media Team", value: `${options.getString("mediateam")}`, inline: true}
        )
    .setFooter({ text: "Infinite Designs" });

    const deptComponents = [
        new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('departments')
                .addOptions({
                    label: 'Law Enforcement',
                    description: 'View information about this department.',
                    value: 'lawe',
                    emoji: '<:RebornLE:1064840167774507128>'
                },
                {
                    label: 'Fire Rescue',
                    description: 'View information about this department.',
                    value: 'firer',
                    emoji: '<:RebornFire:1064840499204210780>'
                },
                {
                    label: 'Civilian Operations',
                    description: 'View information about this department.',
                    value: 'civiliano',
                    emoji: '<:RebornCivilianOps:1065159158703333436>'
                },
                {
                    label: 'Staff Team',
                    description: 'View information about this team.',
                    value: 'stafft',
                    emoji: '<:RebornStaff:1064840978185330739>'
                },
                {
                    label: 'Support Team',
                    description: 'View information about this team.',
                    value: 'supportt',
                    emoji: '<:RebornSupport:1064842528173596782>'
                },
                {
                    label: 'Development Team',
                    description: 'View information about this team.',
                    value: 'developmentt',
                    emoji: '<:RebornDev:1064842526097416252>'
                },
                {
                  label: 'Media Team',
                  description: "View information about this team.",
                  value: "mediat",
                  emoji: "<:reborn_mediateam:1097356711062413322>"
                }
                ),
        ),
    ];
        
        interaction.channel.send({ embeds: [deptEmbed], components: deptComponents });
      }

      break;

/*
██████╗░██╗░░░██╗██╗░░░░░███████╗░██████╗
██╔══██╗██║░░░██║██║░░░░░██╔════╝██╔════╝
██████╔╝██║░░░██║██║░░░░░█████╗░░╚█████╗░
██╔══██╗██║░░░██║██║░░░░░██╔══╝░░░╚═══██╗
██║░░██║╚██████╔╝███████╗███████╗██████╔╝
╚═╝░░╚═╝░╚═════╝░╚══════╝╚══════╝╚═════╝░*/
      case "rules":

      if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
        const { guildId, options, guild, member, user } = interaction;
    
        let rulesEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs Rules** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
        <:infinite:1109702627433926716> **Welcome to the Infinite Designs Rules!** All members of the Infinite Designs community are to be held to these rules and code of conduct. Failure to follow the provided rules and regulations will be met with disciplinary action from the Staff Team. If you have any questions, please make a [support ticket](https://discord.com/channels/1014653913967898654/1014653915440107572)
      
        <:infinite:1109702627433926716> **The rules listed below are to be practiced** in all Infinite Designs platforms, programs, property, etc. This includes, but is not limited to: Discord servers, third-party entities, third-party partners, etc. Failure to abide by these on all related Infinite Designs platforms will be met with disciplinary action.

        <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **How's It Work?** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>

        <:infinite:1109702627433926716> **Each section of the rules is represented** by the Title. The provided Titles will explain the general idea of what each category is going to cover. Please review the following Titles. To find out more information about a title, please click on the dropdown that is underneath this embedded message.

        <:infinite:1109702627433926716> 1⃣ Discord Rules
        <:infinite:1109702627433926716> 2️⃣ Store Rules
        `)
        .setFooter({ text: "Infinite Designs" });
    
        const rulesComponents = [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('rules')
                    .addOptions({
                        label: 'Discord Rules',
                        value: 'rulestwo',
                        emoji: '1⃣'
                    },
                    {
                        label: 'Store Rules',
                        value: 'rulesfive',
                        emoji: '2️⃣'
                    },
                    ),
            ),
        ];
            
            interaction.channel.send({ embeds: [rulesEmbed], components: rulesComponents });
          }

      break;

/*
██╗███╗░░██╗███████╗░█████╗░██████╗░███╗░░░███╗░█████╗░████████╗██╗░█████╗░███╗░░██╗
██║████╗░██║██╔════╝██╔══██╗██╔══██╗████╗░████║██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║
██║██╔██╗██║█████╗░░██║░░██║██████╔╝██╔████╔██║███████║░░░██║░░░██║██║░░██║██╔██╗██║
██║██║╚████║██╔══╝░░██║░░██║██╔══██╗██║╚██╔╝██║██╔══██║░░░██║░░░██║██║░░██║██║╚████║
██║██║░╚███║██║░░░░░╚█████╔╝██║░░██║██║░╚═╝░██║██║░░██║░░░██║░░░██║╚█████╔╝██║░╚███║
╚═╝╚═╝░░╚══╝╚═╝░░░░░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝*/
      case "information":

      if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
        const { guildId, options, guild, member, user } = interaction;
    
        let informationEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs Information** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>

        <:infinite:1109702627433926716> **Upper Staff Chain of Command**

        **Infinite Designs | Ownership & Founders**
        > ➤ <@476222893236158474> - Owner
        > ➤ <@272633301821423617> - Owner
        > ➤ <@703024323140780132> - Owner

        **Infinite Designs | Management**
        > ➤ <@481984055462854686> - General Manager
        > ➤ Vacant - General Manager

        > *➤ Click on the buttons below for more links!*
        `)
        .setFooter({ text: "Infinite Designs" });

        const infoButton = new ActionRowBuilder()
        .addComponents(

            new ButtonBuilder()
            .setLabel('Website')
            .setStyle(ButtonStyle.Link)
            .setEmoji("🔗")
            .setURL("https://rebornrp.net/")
            .setDisabled(true),

            new ButtonBuilder()
            .setLabel('Web Store')
            .setStyle(ButtonStyle.Link)
            .setEmoji("<:webstore:1099572171367514152>")
            .setURL("https://store.rebornrp.net/")
            .setDisabled(true),

            new ButtonBuilder()
            .setLabel('TikTok')
            .setStyle(ButtonStyle.Link)
            .setEmoji("<:tiktok:1099572168100155512>")
            .setURL("https://www.tiktok.com/@rebornfivem")
            .setDisabled(true),

            new ButtonBuilder()
            .setLabel('Instagram')
            .setStyle(ButtonStyle.Link)
            .setEmoji("<:instagram:1099572159115964476>")
            .setURL("https://www.instagram.com/rebornfivem")
            .setDisabled(true),
        )

        const infoButton2 = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setLabel('YouTube')
          .setStyle(ButtonStyle.Link)
          .setEmoji("<:youtube:1099572173007495208>")
          .setURL("https://www.youtube.com/@RebornFiveM/featured")
          .setDisabled(true),
        )
            
        interaction.deferReply();
        interaction.deleteReply();
            interaction.channel.send({ embeds: [informationEmbed], components: [infoButton, infoButton2] });
          }

      break;

/*
███████╗░█████╗░░██████╗░
██╔════╝██╔══██╗██╔═══██╗
█████╗░░███████║██║██╗██║
██╔══╝░░██╔══██║╚██████╔╝
██║░░░░░██║░░██║░╚═██╔═╝░
╚═╝░░░░░╚═╝░░╚═╝░░░╚═╝░░░*/
      case "faq":

      if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
        const { guildId, options, guild, member, user } = interaction;
    
        let faqEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs FAQ** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
        <:infinite:1109702627433926716> **Support Priority Levels**
        > ➤ $300+ Supporter
        > ➤ $125+ Supporter
        > ➤ $50+ Supporter
        > ➤ Customers/Supporters
        > ➤ Partner
        > ➤ Member

        <:infinite:1109702627433926716> **What services does Infinite Designs offer?**
        > ➤ Here at Infinite Designs, we offer a multitude of different services for you or your community. From document creation, Discord Bots, and website development, we also specialize in FiveM livery designs, general graphic designs, EUP creation, and so much more!

        <:infinite:1109702627433926716> **How do I join staff?**
        > ➤ You can read about how to join Staff, along with our other teams such as Support [here](https://discord.com/channels/1014653913967898654/1064846074122096650).

        <:infinite:1109702627433926716> **How do I inquire about buying a service?**
        > ➤ Until we move over to an official website, you can inquire about services [here!](https://discord.com/channels/1014653913967898654/1014653915440107573).

        <:infinite:1109702627433926716> **Can I request custom graphic designs?**
        > ➤ Certainly! To request custom graphic designs to match you or your business' style, simply read the above questions!

        <:infinite:1109702627433926716> **Are there any fees or additional charges?**
        > ➤ At Infinite Designs, we charge a flat rate, although for Discord Bots and websites, that may vary depending if you want it hosted on our servers!

        <:infinite:1109702627433926716> **How can I contact Staff about support?**
        > ➤ Infinite Staff are responsible for maintaining the core values of the server set in place by the Owners & Founders. To request support, please find a Support member, or make a [ticket](https://discord.com/channels/1014653913967898654/1014653915440107572).
        
        <:infinite:1109702627433926716> **How long does it take to complete a project?**
        > ➤ The time required to complete a project or commission can vary, depending on it's complexity and the current workload. After inquiring, our team will give you an estimated time frame, and find a plan that works best for all involved parties.
        
        <:infinite:1109702627433926716> **What payment types are accepted?**
        > ➤ The payment type accepted depends on the developer.

        <:infinite:1109702627433926716> **Can I cancel or change my order after it has been placed?**
        > ➤ Depending on how far along the project is, it may cost a minor fee to completely cancel or adjust your order.

        <:infinite:1109702627433926716> **How can I track the progress of my order?**
        > ➤ To track the progress of your order, simply ask the developer how it is coming along in your Commission Ticket. Please be mindful our workload can be extreme at certain points and to not continuosly bother our developers.
        `)
        .setFooter({ text: "Infinite Designs" });
    
      
            
            interaction.channel.send({ embeds: [faqEmbed] });
          }

      break;

/*
████████╗███████╗██████╗░███╗░░░███╗░██████╗
╚══██╔══╝██╔════╝██╔══██╗████╗░████║██╔════╝
░░░██║░░░█████╗░░██████╔╝██╔████╔██║╚█████╗░
░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║░╚═══██╗
░░░██║░░░███████╗██║░░██║██║░╚═╝░██║██████╔╝
░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═════╝░*/
      case "termsofservice":

      if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
        const { guildId, options, guild, member, user } = interaction;
    
        let tosEmbed1 = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs TOS (1/2)** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
> ➤ This Terms of Service Agreement is to be entered into between the graphic designer "Infinite Designs" and "The Client(s)" for the provision of graphic design services for FiveM graphical development.
 
<:infinite:1109702627433926716> **Scope of Services**
> ➤ **1.** Infinite Designs agrees to provide graphic design services to Client for FiveM in accordance with the specifications and requirements outlined by the Client.
> ➤ **2.** Services may include but are not limited to logo design, banner design, texture creation, livery design, asset texturing, asset re-texturing, and other related graphical elements.

<:infinite:1109702627433926716> **Ownership and Intellectual Property**
> ➤ **1.** The Client retains full ownership and intellectual property rights over any pre-existing materials provided to Infinite Designs for use in the outlined services. If required Infinite Designs will enter a limited agreement to fulfill the customer's request i.e. temporary access to an asset to complete the requested contract.
>    ➤ **1a.** The business entity "Infinite Designs" can not be held liable or accountable for surrendered assets to complete a service.
> ➤ **2.** Infinite Designs grants The Client a non-exclusive, royalty-free, worldwide license to use the final deliverables created during the Services for the Client's intended purposes.
>    ➤ **2a.** The Client may not redistribute the intellectual asset(s) purchased from Infinite Designs, failure to abide will result in a blacklist from any further sales of services.
> ➤ **3.** If The Client chooses to use the intellectual asset(s) purchased from Infinite Designs in another FiveM community, ie. a roleplay community, The Client is responsible for the asset and the prevention of it being leaked.
     
<:infinite:1109702627433926716> **Delivery and Revisions**
> ➤ **1.** Infinite Designs will deliver the completed graphic designs to The Client within the agreed-upon timeframe.
>    ➤ **1a.** The minimum timeframe for any order size will be two weeks, however, if completed sooner then Infinite Designs and The Client may agree to close the deal.
>    ➤ **1b.** The Client must provide payment before the release of any intellectual property by Infinite Designs.
> ➤ **2.**The Client shall have the right to request reasonable revisions to the deliverables within a specified revision limit, as agreed upon by both parties. Additional revisions may be subject to additional fees.
`)
        .setFooter({ text: "Infinite Designs" });

        let tosEmbed2 = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs TOS (2/2)** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> **Payment and Fees**
> ➤ **1.** The Client agrees to pay Infinite Designs the agreed-upon fee for the Services, as specified in the project proposal or invoice.
> ➤ **2.** Payment terms and methods shall be mutually agreed upon by both parties prior to the commencement of the Services.
>    ➤ **2a.** Infinite Designs reserves the right to change the payment terms before the deliverables are handed over. All payments must be done in "USD" (United States Dollar).
> ➤ **3.** All payments must be sent via Cash App or PayPal. Any chargebacks will result in a blacklist from our server as well as all Warden and PTD-associated servers.
>    ➤ **3a.** All payments sent via PayPal must be sent under friends and family.
>    ➤ **3b.** If a PayPal payment is received in a business transaction The Client must wait two weeks for the payment to clear before they will receive the product.   

<:infinite:1109702627433926716> **Confidentiality**
> ➤ **1.** Both parties agree to keep the following confidential: any proprietary or sensitive information disclosed during the course of the project, including but not limited to trade secrets, designs, business strategies, and personal information needed to conduct business.

<:infinite:1109702627433926716> **Termination**
> ➤ **1.** Either party may terminate this Agreement by providing written notice to the other party in the event of a material breach of the terms outlined herein.
> ➤ **2.** In the event of termination, the Client shall compensate Infinite Designs for the Services rendered up to the termination date.

<:infinite:1109702627433926716> **Limitation of Liability**
> ➤ **1.** Infinite Designs shall not be held liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with the Services, including but not limited to any loss of data, profits, or business opportunities.

<:infinite:1109702627433926716> **Entire Agreement**
> ➤ **1.** This Agreement constitutes the entire understanding between the Designer and the Client and supersedes any prior discussions, representations, or agreements, whether written or oral.

> ➤ *By engaging the Designer's services, the Client acknowledges and agrees to be bound by the terms and conditions outlined in this Agreement. Additionally, this Terms of Service is subject to alteration at any time without notice and it is the responsibility of The Client to maintain understanding.*
        `)
        .setFooter({ text: "Infinite Designs" });
    
      
            
            interaction.channel.send({ embeds: [tosEmbed1, tosEmbed2] });
          }

      break;
      case "grimprices":

      if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
      
        const { guildId, options, guild, member, user } = interaction;
    
        let grimPriceEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Grim's Prices and Products** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>

<:infinite:1109702627433926716> **Discord Bots**
> ➤ Custom Discord Bot - Starts at **$3**! Make a commission ticket and ping <@272633301821423617> to discuss commands, features, price, and more!

<:infinite:1109702627433926716> **MLOs (GTA Interiors)**
> ➤ Basic MLO Creation - Starts at **$12.99**! Make a commission ticket and ping <@272633301821423617> to discuss rooms, complexity, price, and more!
> ➤ Advanced MLO Creation - Starts at **$18.99**! Make a commission ticket and ping <@272633301821423617> to discuss rooms, inspiration, complexity, price, and more!
        
<:infinite:1109702627433926716> **YMAPs**
> ➤ Basic YMAP Creation - Starts at **$3.99**!
> ➤ Advanced YMAP Creation - Starts at **$7.99**!

> ➤ *Interested in other services or have questions? Make a [commission ticket!](https://discord.com/channels/1014653913967898654/1014653915440107573)*
`)
        .setFooter({ text: "Infinite Designs - Grim's Prices" });
    
      
            
            interaction.channel.send({ embeds: [grimPriceEmbed] });
          }

      break;
      
  }
}
};
