const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lockdown")
        .setDescription("Locks every channel in the server.")
        .setDefaultMemberPermissions(PermissionFlagsBits.sAdmin),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        if (interaction.member.roles.cache.some(r=> config.sAdmin.includes(r.name)) ) {

        const succesEmbed = new EmbedBuilder()
            .setColor("#0C2037")
            .setTitle(":lock: Locked down!")
            .setDescription(`The server is now on lockdown.`);

        await interaction.guild.channels.cache.forEach(channel => {
            try {
                channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
                    SendMessages: false,
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
