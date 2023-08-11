const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("gban")
   	    .setDescription("GLOBALLY ban a member from all Reborn platforms.")
           .addStringOption(option => 
            option.setName("confirm")
            .setDescription("BY SELECTING 'YES', you understand you are banning this member from every Infinite Designs platform.")
            .setRequired(true)
            .addChoices(
                { name: "YES", value: "YES" },
              )
           )
        .addUserOption(option =>
                option.setName("target")
                .setDescription("Provide member.")
                .setRequired(true)
            )
    .addStringOption(option => 
                    option.setName("reason")
                    .setDescription("Provide reason.")
                    ),
    
    async execute(interaction, bot) {
        const { channel, options } = interaction;

        if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {
        
        const user = options.getUser("target");
        const reason = options.getString("reason");
        
        const member = await interaction.guild.members.fetch(user.id);
        
        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: `You can't punish **${user.username}.**`, ephermal: true });
        }

        bot.guilds.cache.forEach(a => a.members.ban(member))
        
        await interaction.reply({ content: `**${user.username}** was **globally** banned for **${reason}.**` });

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
        .setTitle("Member GLOBALLY banned")
        .setDescription(`**Member Name:** ${user.username} ||(<@${user.id}>)||
**Member ID:** ${user.id}
**Reason:** ${reason}
**Staff Name:** ${interaction.user.username} ||(<@${interaction.user.id}>)||
        `)
        .setTimestamp()
        .setFooter({ text: "Infinite Designs" })
                
                
                
                send_log(member.guild.id, logsEmbed);
    } else {
        return interaction.reply({content: "You do not have permission for this."})
    }
} 
};