const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require("discord.js")
const requestStaff = require("../../Models/RequestStaff");
const prettyMilliseconds = require("ms");
const config = require("../../config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staff-ping')
    .setDescription('Ping the staff team to notify that staff need to be active in-game!'),
  
  async execute(interaction, client) {
    const { guildId, options, guild, member, user } = interaction;

    if (interaction.member.roles.cache.some(r=> config.sAll.includes(r.name)) ) {

      const user = interaction.member.user

      const userData = await requestStaff.findOne({ id: user.id }) || new requestStaff({ id: user.id })
      const embed = new EmbedBuilder().setColor("#0C2037");

        if (userData.cooldowns.request > Date.now())
            return interaction.reply({
                embeds: [
                    embed.setDescription(`⌛ You can not request staff for another **\`${prettyMilliseconds(userData.cooldowns.request - Date.now(), { verbose: true, secondsDecimalDigits: 0 })}\`**`)
                ],
                ephemeral: false
            });

            userData.cooldowns.request = Date.now() + (60000 * 360)
            userData.save()

            interaction.deferReply();
            interaction.deleteReply();
            return interaction.channel.send({ 
                embeds: [
                    embed.setDescription(`🆘 The server is lacking staff members! If you are online, please join the server as staff.`),
                    embed.setFooter({ text: `Requested by ${interaction.user.username}`})
                ],
                content: '||<@&1014653914030817318>||' 
            });

        userData.cooldowns.request = Date.now() + (60000 * 360)
        userData.save()
        
    } else {
        interaction.reply({ content: "You do not have permission to do this.", ephemeral: true })
    }
  },
};