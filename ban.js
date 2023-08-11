const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("ban")
   	    .setDescription("Ban a member from the server.")
        .addUserOption(option =>
                option.setName("target")
                .setDescription("Provide member.")
                .setRequired(true)
            )
    .addStringOption(option => 
                    option.setName("reason")
                    .setDescription("Provide reason.")
                    ),
    
    async execute(interaction) {
        const { channel, user, options } = interaction;

        function send_log(guildId, embed) {
            logSchema.findOne({ Guild: guildId }, async (err, data) => {
                if (!data || !data.Channel) return;
                const LogChannel = interaction.client.channels.cache.get(data.Channel);
                embed.setTimestamp();
                LogChannel.send({ embeds: [embed] });
            });
        }

        if (interaction.member.roles.cache.some(r=> config.sAdministrator.includes(r.name)) ) {
        
        const target = options.getUser("target");
        const reason = options.getString("reason");
        const userTag = `${target.username}#${target.discriminator}`;
        
        const member = await interaction.guild.members.fetch(target.id);
        
        if (member.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.reply({ content: `You can't punish **${target.username}.**`, ephermal: true });
        }

        const dmEmbed2 = new EmbedBuilder()
        .setColor("#0C2037")
        .setDescription(`Successfully banned ${target} for **${reason}**
        
        > *Infinite Designs*`)

        await member.ban({reason});
        
        await interaction.reply({ content: `**${target.username}** was banned from Infinite Designs
        
        > Reason: **${reason}.**` });

        await interaction.user.send({ embeds: [dmEmbed2] }).catch(err => {
          return;
      })

        const logsEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Member Banned")
        .setDescription(`**Member Name:** ${target.username} ||(<@${target.id}>)||
**Member ID:** ${target.id}
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