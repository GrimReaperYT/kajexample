const { CommandInteraction, ActionRowBuilder, TextInputStyle, ModalBuilder, TextInputBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    const { customId, values, guild, member } = interaction; // you need to destructure values from interaction first to use it below
    if (interaction.isStringSelectMenu()) {
        if (customId == "vip-tiers") {

          const selected = interaction.values[0];

	        if (selected === 'vip') {

            let vipEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **<:vip:1066474822403629066> VIP <:vip:1066474822403629066>** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> Below, you will find all information and perks for the **VIP Tier.**

>>> <:infinite:1109702627433926716> Level 1 Queue Priority 
<:infinite:1109702627433926716> Colored Name 
<:infinite:1109702627433926716> 5 VIP Cars 
<:infinite:1109702627433926716> VIP Discord Color
<:infinite:1109702627433926716> $100 Paycheck Bonus 
<:infinite:1109702627433926716> Level 1 Menu Perks 
<:infinite:1109702627433926716> Access to VIP Giveaways 
<:infinite:1109702627433926716> Access to Private VIP Channels 
<:infinite:1109702627433926716> VIP Priority Ticket Support 
<:infinite:1109702627433926716> Custom In-Game VIP Tag

<:infinite:1109702627433926716> View more information on the [store!](https://store.rebornrp.net/category/rank-subscriptions)
        `)
        .setFooter({ text: "Infinite Designs" });

          interaction.reply({ embeds: [vipEmbed], ephemeral: true })

          } else if (selected === 'vip-plus') {

            let vipPlusEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **<:vip_plus:1066474824559501362> VIP+ <:vip_plus:1066474824559501362>** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> Below, you will find all information and perks for the **VIP+ Tier.**

>>> <:infinite:1109702627433926716> Level 2 Queue Priority 
<:infinite:1109702627433926716> Colored Name 
<:infinite:1109702627433926716> 10 VIP Cars 
<:infinite:1109702627433926716> VIP+ Discord Color 
<:infinite:1109702627433926716> $125 Paycheck Bonus 
<:infinite:1109702627433926716> Level 2 Menu Perks 
<:infinite:1109702627433926716> Access to Super Cars 
<:infinite:1109702627433926716> Access to VIP Giveaways 
<:infinite:1109702627433926716> Access to Private VIP Channels 
<:infinite:1109702627433926716> VIP Priority Ticket Support
<:infinite:1109702627433926716> Custom In-Game VIP Tag 

<:infinite:1109702627433926716> View more information on the [store!](https://store.rebornrp.net/category/rank-subscriptions)
        `)
        .setFooter({ text: "Infinite Designs" });

          interaction.reply({ embeds: [vipPlusEmbed], ephemeral: true })

          } else if (selected === 'mvp') {

            let mvpEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **<:mvp:1066474825817800824>  MVP <:mvp:1066474825817800824>** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> Below, you will find all information and perks for the **MVP Tier.**

>>> <:infinite:1109702627433926716> Level 3 Queue Priority 
<:infinite:1109702627433926716> Colored Name 
<:infinite:1109702627433926716> 20 VIP Cars 
<:infinite:1109702627433926716> MVP Discord Color 
<:infinite:1109702627433926716> $250 Paycheck Bonus 
<:infinite:1109702627433926716> Level 3 Menu Perks 
<:infinite:1109702627433926716> Access to Super Cars 
<:infinite:1109702627433926716> Animal RP 
<:infinite:1109702627433926716> Store Pack Access 
<:infinite:1109702627433926716> Personal Vehicle\* (Additional $10) 
<:infinite:1109702627433926716> Access to VIP Giveaways 
<:infinite:1109702627433926716> Access to Private VIP Channels 
<:infinite:1109702627433926716> GIF Permissions 
<:infinite:1109702627433926716> VIP Priority Ticket Support 
<:infinite:1109702627433926716> Custom In-Game VIP Tag

<:infinite:1109702627433926716> View more information on the [store!](https://store.rebornrp.net/category/rank-subscriptions)
        `)
        .setFooter({ text: "Infinite Designs" });

          interaction.reply({ embeds: [mvpEmbed], ephemeral: true })

          } else if (selected === 'mvp-plus') {

            let mvpPlusEmbed = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **<:mvp_plus:1066474827290005654>  MVP+ <:mvp_plus:1066474827290005654>** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> Below, you will find all information and perks for the **MVP+ Tier.** This tier is the most superior package for our members and includes the most premium features.

>>> <:infinite:1109702627433926716> Level 4 Queue Priority 
<:infinite:1109702627433926716> Colored Name 
<:infinite:1109702627433926716> 30 VIP Cars 
<:infinite:1109702627433926716> MVP+ Discord Color 
<:infinite:1109702627433926716> $300 Paycheck Bonus 
<:infinite:1109702627433926716> Level 4 Menu Perks 
<:infinite:1109702627433926716> Access to Super Cars 
<:infinite:1109702627433926716> Torque & Engine Boost 
<:infinite:1109702627433926716> Animal RP 
<:infinite:1109702627433926716> Store Pack Access
<:infinite:1109702627433926716> 2 Store Packs of Your Choice!
<:infinite:1109702627433926716> Personal Vehicle\* (Additional $10) 
<:infinite:1109702627433926716> Personal PED 
<:infinite:1109702627433926716> MK2 Weapon Access 
<:infinite:1109702627433926716> Access to VIP Giveaways 
<:infinite:1109702627433926716> Access to Private VIP Channels 
<:infinite:1109702627433926716> GIF Permissions 
<:infinite:1109702627433926716> Private Discord Office 
<:infinite:1109702627433926716> VIP Priority Ticket Support 
<:infinite:1109702627433926716> Custom In-Game VIP Tag

<:infinite:1109702627433926716> View more information on the [store!](https://store.rebornrp.net/category/rank-subscriptions)
        `)
        .setFooter({ text: "Infinite Designs" });

          interaction.reply({ embeds: [mvpPlusEmbed], ephemeral: true })

          }
    }
}
  }
}