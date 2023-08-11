const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("gunban")
   	    .setDescription("GLOBALLY unban a member from all Infinite platforms.")
           .addStringOption(option => 
            option.setName("confirm")
            .setDescription("BY SELECTING 'YES', you understand you are UNbanning this member from every Infinite platform.")
            .setRequired(true)
            .addChoices(
                { name: "YES", value: "YES" },
              )
           )
        .addStringOption(option =>
                option.setName("target-id")
                .setDescription("Provide ID.")
                .setRequired(true)
            )
    .addStringOption(option => 
                    option.setName("reason")
                    .setDescription("Provide reason.")
                    ),
    
    async execute(interaction, bot) {
        const { channel, options } = interaction;

        if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
        
        const userID = options.getString("target-id");
        const reason = options.getString("reason");
    

        bot.guilds.cache.forEach(a => a.members.unban(userID))
        
        await interaction.reply({ content: `**${userID}** was **globally** unbanned for **${reason}.**` });

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
        .setTitle("Member GLOBALLY unbanned")
        .setDescription(`**Member ID:** ${userID}
**Reason:** ${reason}
**Staff Name:** ${interaction.user.username} ||(<@${interaction.user.id}>)||
        `)
        .setTimestamp()
        .setFooter({ text: "Infinite Designs" })
                
                
                
                send_log(interaction.guild.id, logsEmbed);
    } else {
        return interaction.reply({content: "You do not have permission for this."})
    }
} 
};