const rrSchema = require("../../Models/ReactionRoles");
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel-send")
        .setDescription("Sends the reaction role panel.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        const { options, guildId, guild, channel } = interaction;

        try {
            const data = await rrSchema.findOne({ GuildID: guildId });

            if (!data.roles.length > 0)
                return interaction.reply({ content: "This server does not have any data.", ephemeral: true });

            let panelEmbed = new EmbedBuilder()
    .setColor("#0C2037")
    .setThumbnail("https://i.imgur.com/enzzzWC.png")
    .setDescription(`<:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561> **Infinite Designs REACTION ROLES** <:infinitedash:1109709769725460561><:infinitedash:1109709769725460561><:infinitedash:1109709769725460561>
    
Welcome to the Reaction Role section of Infinite Designs, here we offer all kinds of roles that you can get to be notified of all sorts of things like store updates, media uploads, streams, giveaways, and more!

React down below to receive your roles!
    `)
    .setFooter({ text: "Infinite Designs" });

            const options = data.roles.map(x => {
                const role = guild.roles.cache.get(x.roleId);

                return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription,
                    emoji: x.roleEmoji || undefined
                };
            });

            const menuComponents = [
                new ActionRowBuilder().addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('reaction-roles')
                        .setMaxValues(options.length)
                        .addOptions(options),
                ),
            ];

            channel.send({ embeds: [panelEmbed], components: menuComponents });

            return interaction.reply({ content: "Succesfully sent your panel.", ephemeral: true });
        } catch (err) {
            console.log(err);
        }
    }
}