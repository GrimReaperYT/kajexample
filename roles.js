const Discord = require("discord.js");
const rankData = ("../rankdata.json");
const { Client, SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle, TextInputBuilder } = require ("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Official role manager.")
  .addSubcommand(subcommand =>
		subcommand
			.setName('recruit')
			.setDescription('Assign recruit roles to a member.')
			.addUserOption(option => option.setName('target').setDescription('Provide Recruit.').setRequired(true))
            .addIntegerOption(option => option.setName('callsign').setDescription('Provide Callsign').setRequired(true).setMinValue(200).setMaxValue(400))
            .addStringOption(option => option.setName('firstandlast').setDescription('Provide Name (First L.)').setRequired(true))
    )
  .addSubcommand(subcommand =>
		subcommand
			.setName('fto')
			.setDescription('Assign FTO roles to a member.')
			.addUserOption(option => option.setName('target').setDescription('Provide TO.').setRequired(true))
    )
  .addSubcommand(subcommand =>
		subcommand
			.setName('promote')
			.setDescription('Promote a member one rank.')
			.addUserOption(option => option.setName('target').setDescription('Provide Member.').setRequired(true))
    )
    .addSubcommand(subcommand =>
		subcommand
			.setName('demote')
			.setDescription('Demote a member one rank.')
			.addUserOption(option => option.setName('target').setDescription('Provide Member.').setRequired(true))
    ),
    
    async execute(interaction) {
      
        
        if (interaction.guild.id === "1014653412975050752" ) {

        const { guild, options, member } = interaction;
        const sub = options.getSubcommand(["recruit", "fto", "promote", "demote"]);
        const roleID = "1034165257549123684" || "1014653413348356149"; //DS
        const target = interaction.options.getMember('target');
        const callsign = interaction.options.getInteger('callsign');
        const name = interaction.options.getString('firstandlast');
      
      
      switch (sub) {
            case "recruit":
        
            if (interaction.member.roles.cache.some(r=>["Department Staff", "High Command", "Reborn | Management"].includes(r.name)) ) {
          
        const LEO = member.guild.roles.cache.find(role => role.name === "Reborn | Law Enforcement");
        const Ofc1 = member.guild.roles.cache.find(role => role.name === "Officer I");
        const Training = member.guild.roles.cache.find(role => role.name === "Awaiting Field Training");
        const RideAlong = member.guild.roles.cache.find(role => role.name === "Awaiting Field Ride-Along");
        const Applicant = member.guild.roles.cache.find(role => role.name === "Reborn | Member");
        const Int = member.guild.roles.cache.find(role => role.name === "Awaiting Interview");
        
        await target.roles.add(LEO).catch(console.error);
        await target.roles.add(Ofc1).catch(console.error);
        await target.roles.add(Training).catch(console.error);
        await target.roles.add(RideAlong).catch(console.error);
        await target.roles.remove(Applicant);
        await target.roles.remove(Int);
                  
        await target.setNickname(`[${callsign}] ${name}`);
        
        interaction.reply({ content: "Success!", ephermal: true});
        
          } else {
        
        interaction.reply({ content: "You do not have permissions to execute this command.", ephermal: true});
        
              }
        
        break;
          case "fto":
          
          if (interaction.member.roles.cache.some(r=>["Department Staff", "High Command", "Reborn | Management"].includes(r.name)) ) {
                
        const TO = member.guild.roles.cache.find(role => role.name === "Training Officer");
          
          await target.roles.add(TO).catch(console.error);
                     
                     interaction.reply({ content: "Success!", ephermal: true});
                     
                         } else {
        
        interaction.reply({ content: "You do not have permissions to execute this command.", ephermal: true});
        
              }
          
          break;
            case "promote":
      
      // Ranks Start
      const ofc1 = member.guild.roles.cache.find(role => role.name === "Officer I");
      const ofc2 = member.guild.roles.cache.find(role => role.name === "Officer II");
      const ofc3 = member.guild.roles.cache.find(role => role.name === "Officer III");
      const srofc = member.guild.roles.cache.find(role => role.name === "Senior Officer");
      const cpl = member.guild.roles.cache.find(role => role.name === "Corporal");
      const sgt = member.guild.roles.cache.find(role => role.name === "Sergeant");
      const msgt = member.guild.roles.cache.find(role => role.name === "Master Sergeant");
      const dptstf = member.guild.roles.cache.find(role => role.name === "Department Staff");
      const lt = member.guild.roles.cache.find(role => role.name === "Lieutenant");
      const cpt = member.guild.roles.cache.find(role => role.name === "Captain");
      // Ranks End
      
      if (interaction.member.roles.cache.some(r=>["High Command", "Reborn | Management"].includes(r.name)) ) {
        
      if (target.roles.cache.has("1014653413197353044")) {
          
          await target.roles.remove(ofc1).catch(console.error);
          await target.roles.add(ofc2).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Officer 2**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353046")) {
          
          await target.roles.remove(ofc2).catch(console.error);
          await target.roles.add(ofc3).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Officer 3**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353047")) {
          
          await target.roles.remove(ofc3).catch(console.error);
          await target.roles.add(srofc).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Senior Officer**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353048")) {
          
          await target.roles.remove(ofc3).catch(console.error);
          await target.roles.add(cpl).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Corporal**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353049")) {
          
          await target.roles.remove(cpl).catch(console.error);
          await target.roles.add(sgt).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Sergeant**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353050")) {
          
          await target.roles.remove(sgt).catch(console.error);
          await target.roles.add(msgt).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Master Sergeant**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413235114004")) {
          
          await target.roles.remove(msgt).catch(console.error);
          await target.roles.add(dptstf).catch(console.error);
          await target.roles.add(lt).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Lieutenant**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413235114005")) {
          
          await target.roles.remove(lt).catch(console.error);
          await target.roles.add(cpt).catch(console.error);
        
          interaction.reply({ content: "Successfully promoted **" + target.user.username + "** to **Captain**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413235114006" || "1014653413348356149")) {
        
          interaction.reply({ content: "The provided user can not be promoted to a higher rank with this command. Maybe you mean `/roles set`?", ephermal: true});
          
        } else if (!interaction.member.roles.cache.has("1014653413310603296")) { //HC
        
        interaction.reply({ content: "You do not have permissions to execute this command.", ephermal: true});
        
      } else if (!interaction.member.roles.cache.has("1056096258164523010")) {
        
        interaction.reply({ content: "You do not have permissions to execute this command.", ephermal: true});
      
    }
    } else {
        
        interaction.reply({ content: "You do not have permissions to execute this command.", ephermal: true});
      
    }
          
      break;
          
            case "demote":
      
            if (interaction.member.roles.cache.some(r=>["High Command", "Reborn | Management"].includes(r.name)) ) {
        
        const { member, guild } = interaction;
        const target = interaction.options.getMember('target');
        
      // Ranks Start
      const ofc1 = member.guild.roles.cache.find(role => role.name === "Officer I");
      const ofc2 = member.guild.roles.cache.find(role => role.name === "Officer II");
      const ofc3 = member.guild.roles.cache.find(role => role.name === "Officer III");
      const srofc = member.guild.roles.cache.find(role => role.name === "Senior Officer");
      const cpl = member.guild.roles.cache.find(role => role.name === "Corporal");
      const sgt = member.guild.roles.cache.find(role => role.name === "Sergeant");
      const msgt = member.guild.roles.cache.find(role => role.name === "Master Sergeant");
      const dptstf = member.guild.roles.cache.find(role => role.name === "Department Staff");
      const lt = member.guild.roles.cache.find(role => role.name === "Lieutenant");
      const cpt = member.guild.roles.cache.find(role => role.name === "Captain");
      // Ranks End
        
      if (target.roles.cache.has("1014653413197353046" || "1014653413348356149")) {
          
          await target.roles.add(ofc1).catch(console.error);
          await target.roles.remove(ofc2).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Officer I**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353047")) {
          
          await target.roles.add(ofc2).catch(console.error);
          await target.roles.remove(ofc3).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Officer 2**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353048")) {
          
          await target.roles.add(ofc3).catch(console.error);
          await target.roles.remove(srofc).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Officer 3**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353049")) {
          
          await target.roles.add(ofc3).catch(console.error);
          await target.roles.remove(cpl).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Senior Officer**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353050")) {
          
          await target.roles.add(cpl).catch(console.error);
          await target.roles.remove(sgt).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Corporal**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413235114004")) {
          
          await target.roles.add(sgt).catch(console.error);
          await target.roles.remove(msgt).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Sergeant**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413235114005")) {
          
          await target.roles.add(msgt).catch(console.error);
          await target.roles.remove(dptstf).catch(console.error);
          await target.roles.remove(lt).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Master Sergeant**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413235114006")) {
          
          await target.roles.add(lt).catch(console.error);
          await target.roles.remove(cpt).catch(console.error);
        
          interaction.reply({ content: "Successfully demoted **" + target.user.username + "** to **Lieutenant**.", ephermal: true});
          
        } else if (target.roles.cache.has("1014653413197353044")) {
        
          interaction.reply({ content: "The provided user can not be demoted to a lower rank with this command. Maybe you mean `/roles terminate`?", ephermal: true});
          
        } 
      } 
          
          break;
        
          
      }
    } else {
        interaction.reply({content: "This must be done in the Law Enforcement Discord.", ephemeral: true})
    }
    }
};