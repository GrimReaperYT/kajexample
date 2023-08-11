const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("unban")
   	    .setDescription("Unban a member from the server.")
        .addStringOption(option =>
                option.setName("userid")
                .setDescription("Provide UserID.")
                .setRequired(true)
            ),
    
    async execute(interaction) {
        const { channel, options } = interaction;
        
        const userID = options.getString("userid");
        
        if (interaction.member.roles.cache.some(r=> config.sAdministrator.includes(r.name)) ) {


        try {
            await interaction.guild.members.unban(userID);
            
            await interaction.reply({ content: `**${userID}** was unbanned.` });

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
            .setTitle("Member Unbanned")
            .setDescription(`**Member ID:** ${userID}
    **Staff Name:** ${interaction.user.username} ||(<@${interaction.user.id}>)||
            `)
            .setTimestamp()
            .setFooter({ text: "Infinite Designs" })
                    
                    
                    
                    send_log(interaction.guild.id, logsEmbed);
        } catch (err) {
            console.log(err);
            
            await interaction.reply({ content: `**${userID}** is not banned.`, ephermal: true });
        }
        
    } else {
        return interaction.reply({content: "You do not have permission for this."})
    }
}
};