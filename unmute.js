const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("unmute")
   	    .setDescription("Unmutes a member.")
        .addUserOption(option =>
                option.setName("target")
                .setDescription("Provide member.")
                .setRequired(true)
            ),
    
    async execute(interaction) {
        const { guild, options } = interaction;
        
        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);
        
        if (interaction.member.roles.cache.some(r=> config.sModerator.includes(r.name)) ) {

        
        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: `You can't pardon **${user.username}.**`, ephermal: true });
        }
        
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({ content: `You can't pardon **${user.username}.**`, ephermal: true });
        }
        
        
        try {
            await member.timeout(null);
            
       	    await interaction.reply({ content: `**${user.username}** was unmuted.` });

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
            .setTitle("Member Unmuted")
            .setDescription(`**Member Name:** ${user.username} ||(<@${user.id}>)||
    **Member ID:** ${user.id}
    **Staff Name:** ${interaction.user.username} ||(<@${interaction.user.id}>)||
            `)
            .setTimestamp()
            .setFooter({ text: "Infinite Designs" })
                    
                    
                    
                    send_log(member.guild.id, logsEmbed);
            } catch (err) {
                console.log(err);
        }
    } else {
        return interaction.reply({content: "You do not have permission for this."})
    }
}
};