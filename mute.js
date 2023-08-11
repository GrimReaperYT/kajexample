const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("mute")
   	    .setDescription("Mutes a member.")
        .addUserOption(option =>
                option.setName("target")
                .setDescription("Provide member.")
                .setRequired(true)
            )
    .addStringOption(option => 
                    option.setName("duration")
                    .setDescription("Provide duration.")
                    .setRequired(true)
                    )
    .addStringOption(option => 
                    option.setName("reason")
                    .setDescription("Provide reason.")
                    ),
    
    async execute(interaction) {
        const { guild, options } = interaction;
        
        const user = options.getUser("target");
        const member = guild.members.cache.get(user.id);
        const time = options.getString("duration");
        const convertedTime = ms(time);
        const reason = options.getString("reason") || "No reason provided.";
        
        if (interaction.member.roles.cache.some(r=> config.sAll.includes(r.name)) ) {

        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: `You can't punish **${user.username}.**`, ephermal: true });
        }
        
        if(!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({ content: `You can't punish **${user.username}.**`, ephermal: true });
        }
        
        if(!convertedTime) {
            return interaction.reply({ content: `Something went wrong.`, ephermal: true });
        }
        
        try {
            await member.timeout(convertedTime, reason);
            
       	    await interaction.reply({ content: `**${user.username}** was muted for **${time}** for **${reason}.**` });

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
            .setTitle("Member Muted")
            .setDescription(`**Member Name:** ${user.username} ||(<@${user.id}>)||
    **Member ID:** ${user.id}
    **Reason:** ${reason}
    **Length:** ${time}
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