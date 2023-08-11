const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lock")
        .setDescription("Locks the channel")
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("Select a channel")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.sAdmin),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        if (interaction.member.roles.cache.some(r=> config.sAdmin.includes(r.name)) ) {


        const succesEmbed = new EmbedBuilder()
            .setColor("#0C2037")
            .setTitle(":lock: Locked!")
            .setDescription(`Channel succesfully locked.`);

        await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
            SendMessages: false,
        });

        await interaction.reply({
            embeds: [succesEmbed],
        });
    }
}
}