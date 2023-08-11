const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlockdown")
        .setDescription("Unlocks every channel in the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        if (interaction.member.roles.cache.some(r=> config.sAdmin.includes(r.name)) ) {



        const succesEmbed = new EmbedBuilder()
            .setColor("#0C2037")
            .setTitle(":lock: Unlocked!")
            .setDescription(`The server is now unlocked.`);

        await interaction.guild.channels.cache.forEach(channel => {
            try {
                channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SendMessages: true,
                });

            } catch (err) {
                console.log(err);
            }
        })

        interaction.reply({
            embeds: [succesEmbed],
        });
        }
    }
}
