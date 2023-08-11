const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const config = require("../../config.json");

module.exports = {
     data: new SlashCommandBuilder()
         .setName('moveall')
         .setDescription('Move all members in the specified channel to target channel')
         .setDefaultMemberPermissions(PermissionFlagsBits.sAdmin)
         .addChannelOption(option =>
             option.setName('source')
                 .setDescription('The source channel of the member to be moved')
                 .addChannelTypes(ChannelType. GuildVoice)
                 .setRequired(true))
         .addChannelOption(option =>
             option.setName('target')
                 .setDescription('The target channel to move the member to')
                 .addChannelTypes(ChannelType. GuildVoice)
                 .setRequired(true)),

     async execute(interaction) {

        if (interaction.member.roles.cache.some(r=> config.sAdmin.includes(r.name)) ) {

         const sourceChannel = interaction.options.getChannel('source');
         const targetChannel = interaction.options.getChannel('target');

         await sourceChannel.members.forEach(member => {
             member.voice.setChannel(targetChannel);
         });

         return interaction.reply({ content: 'Done.', ephemeral: true });
      }
    }
};