const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("kick")
        .setDescription("Kick a user from the discord server.")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Provide Member.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Provide Reason.")
        ),

    
    async execute(interaction, client) {
        const { channel, options } = interaction;

        const user = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided";
        
        if (!interaction.member.roles.cache.some(r=> config.sModerator.includes(r.name))) return interaction.reply({content: "You do not have permission for this."})

        const member = await interaction.guild.members.fetch(user.id);

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `You can't punish **${user.username}.**`, ephemeral: true });
        
        await member.kick({reason});

        
        await interaction.reply({ content: `**${user.username}** was kicked for **${reason}.**` });

        function send_log(guildId, embed) {
            logSchema.findOne({ Guild: guildId }, async (err, data) => {
                if (!data || !data.Channel) return;
                const LogChannel = interaction.client.channels.cache.get(data.Channel);
                embed.setTimestamp();
                LogChannel.send({ embeds: [embed] });
            });
        }

        const logsEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Member Kicked")
        .setDescription(`**Member Name:** ${user.username} ||(<@${user.id}>)||
**Member ID:** ${user.id}
**Reason:** ${reason}
**Staff Name:** ${interaction.user.username} ||(<@${interaction.user.id}>)||
        `)
        .setTimestamp()
        .setFooter({ text: "Infinite Designs" })
                
                
                
                send_log(member.guild.id, logsEmbed);
}
};