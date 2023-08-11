const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const warningSchema = require("../../Models/Warnings");
const logSchema = require("../../Models/Logs");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    	.setName("warnings")
   	    .setDescription("Warning system.")
  	    .addSubcommand(subcommand =>
                 subcommand.setName("add")
                   .setDescription("Add a warning to a member.")
                   .addUserOption(option =>
        				option.setName("target")
      				    .setDescription("Provide Member.")
     			        .setRequired(true)
  		  )
                   .addStringOption(option =>
        				option.setName("reason")
      				    .setDescription("Provide Reason.")
     			        .setRequired(false)
  		  )
                       .addStringOption(option =>
        				option.setName("evidence")
      				    .setDescription("Provide Evidence.")
     			        .setRequired(false)
  		  )
                       )
    .addSubcommand(subcommand =>
                   subcommand.setName("check")
                   .setDescription("Check warnings of a member.")
                   .addUserOption(option =>
        				option.setName("target")
      				    .setDescription("Provide Member.")
     			        .setRequired(true)
  		  )
                   )
    .addSubcommand(subcommand =>
                   subcommand.setName("pardon")
                   .setDescription("Pardon the warning of a member.")
                   .addUserOption(option =>
        				option.setName("target")
      				    .setDescription("Provide Member.")
     			        .setRequired(true)
  		  )
                       .addIntegerOption(option =>
        				option.setName("id")
      				    .setDescription("Provide ID.")
     			        .setRequired(true)
  		  )
    )
    .addSubcommand(subcommand =>
                   subcommand.setName("clear")
                   .setDescription("Clear all warnings of a member.")
                   .addUserOption(option =>
        				option.setName("target")
      				    .setDescription("Provide Member.")
     			        .setRequired(true)
  		  )
                   ),
    
    async execute(interaction) {
        const { options, guildId, user, member, client } = interaction;
        
    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data || !data.Channel) return;
            const LogChannel = client.channels.cache.get(data.Channel);
            embed.setTimestamp();
            LogChannel.send({ embeds: [embed] });
        });
    }
       
        
        const sub = options.getSubcommand(["add", "check", "pardon", "clear"]);
        const target = options.getUser("target");
        const reason = options.getString("reason") || "No reason provided.";
        const evidence = options.getString("evidence") || "No evidence provided.";
        const warnID = options.getInteger("id") - 1;
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();
        
        const userTag = `${target.username}#${target.discriminator}`;
        
        const Warnembed = new EmbedBuilder()
            .setColor('Red')
        	.setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
        	.setTimestamp();
        
            if (interaction.member.roles.cache.some(r=> config.sAll.includes(r.name)) ) {

        switch (sub) {
            case "add":
                warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) => {
                    if (err) throw err;
                    
                    if (!data) {
                        data = new warningSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecuterID: user.id,
                                    ExecuterTag: user.username,
                                    Reason: reason,
                                    Evidence: evidence,
                                    Date: warnDate
                                }
                            ]
                        });
                    } else {
                        const warnContent = {
                                    ExecuterID: user.id,
                                    ExecuterTag: user.username,
                                    Reason: reason,
                                    Evidence: evidence,
                                    Date: warnDate
                        };
                        data.Content.push(warnContent);
                    }
                    data.save();
                });
                
                        Warnembed.setColor("Red")
                        .setDescription(`${userTag} was assigned a warning for: ${reason}`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();
                
        const logsEmbedd = new EmbedBuilder()
            .setColor('Red')
        	.setTitle(`${userTag} was warned.`)
        	.addFields(
            	{ name: "Staff", value: `${user.username}#${user.discriminator}` },
                { name: "Reason", value: `${reason}` }
            )
        	.setTimestamp();
                
                interaction.reply({ embeds: [Warnembed] });
                
                send_log(member.guild.id, logsEmbedd);
                
                break;
            case "check":
                 warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) => {
                     if (err) throw err;
                    
                    if (data) {
                        Warnembed.setTitle(`${target.tag}'s | ||**${target.id}**|| warnings.`)
                		.setDescription(`${data.Content.map(
            				(w, i) =>
                            `**ID:** ${i + 1}
							 **Staff:** <@${w.ExecuterID}> | || ${w.ExecuterTag} ||
							 **Reason:** ${w.Reason}
							 **Evidence:** ${w.Evidence}\n`
           				    ).join("```-----```")}
         `);
                        
                        interaction.reply({ embeds: [Warnembed] });
                        
                    } else {
                        Warnembed.setDescription(`${userTag} | ||${target.id}|| has no warnings.`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();
                        
                        
                          interaction.reply({ embeds: [Warnembed] });
                    }
                 });
                
                break;
            case "pardon":
                 warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag}, async (err, data) => {
                     if (err) throw err;
                    
                    if (data) {
                        data.Content.splice(warnID, 1);
                        data.save();
                        
                        Warnembed.setDescription(`${userTag}'s Warning ID **${warnID + 1}** has been removed.`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();
                        
                          interaction.reply({ embeds: [Warnembed] });
                        
                    } else {
                        Warnembed.setDescription(`${userTag} has no warnings. | ||${target.id}||`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();
                        
                          interaction.reply({ embeds: [Warnembed] });
                    }
                 });
                break;
            case "clear":
warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                     if (err) throw err;
                    
                    if (data) {
                        await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: userTag });
                        
                        Warnembed.setColor("Green")
                        .setDescription(`${userTag}'s warnings were cleared. | ||${target.id}||`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();
                        
                          interaction.reply({ embeds: [Warnembed] });
                        
                    } else {
                        Warnembed.setColor("Red")
                        .setDescription(`${userTag} | ||${target.id}|| has no warnings.`)
                        .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true })})
                        .setTimestamp();
                        
                          interaction.reply({ embeds: [Warnembed] });
                    }
                 });
                break;
        }
        
        
        } else {
            return interaction.reply({content: "You do not have permission for this."})
        }
    }
        
};