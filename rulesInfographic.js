const { CommandInteraction, ActionRowBuilder, TextInputStyle, ModalBuilder, TextInputBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    const { customId, values, guild, member } = interaction; // you need to destructure values from interaction first to use it below
    if (interaction.isStringSelectMenu()) {
        if (customId == "rules") {

          const selected = interaction.values[0];

	        if (selected === 'rulestwo') {

            let rulesTwo = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Discord Rules** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> Respect All Players
<:infinite:1109702627433926716> Use Common Sense
<:infinite:1109702627433926716> No Trolling.
<:infinite:1109702627433926716> No use of Racial / Homophobic / Bigoted / Sexist / Vulgar slurs on any Infinite Designs service i.e. use of slurs in a voice chat or nickname in the Discord.
<:infinite:1109702627433926716> No Drama/Spreading Rumors (This creates a toxic environment.)
<:infinite:1109702627433926716> No Chat Spam (more than 3 of the same message)
<:infinite:1109702627433926716> No Blackmailing/Using information for your benefit (This creates a toxic environment.)
<:infinite:1109702627433926716> No Ear Rape / Mic Spam / Low Quality Mic (Staff can regulate music being played.)
<:infinite:1109702627433926716> No False Staff Reports
<:infinite:1109702627433926716> No Controversial or Political discussion.
        `)
        .setFooter({ text: "Infinite Designs" });

          interaction.reply({ embeds: [rulesTwo], ephemeral: true })

          } else if (selected === 'rulesfive') {

            let rulesFive = new EmbedBuilder()
        .setColor("#0C2037")
        .setThumbnail("https://i.imgur.com/enzzzWC.png")
        .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Web Store Rules** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
        
<:infinite:1109702627433926716> All web store rules can be viewed on the forum (Coming Soon).
<:infinite:1109702627433926716> Chargebacks are unacceptable and bannable.
<:infinite:1109702627433926716> All purchases are final.
        `)
        .setFooter({ text: "Infinite Designs" });

          interaction.reply({ embeds: [rulesFive], ephemeral: true })

          }

        }
    }
}
}