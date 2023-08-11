const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');
const config = require("../../config.json");
const logSchema = require("../../Models/Logs");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge a certain amount of messages from a channel.")
    .addIntegerOption(option =>
        option.setName('amount')
        .setDescription('Amount of messages to clear.')
        .setMinValue(1)
        .setMaxValue(99)
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('target')
        .setDescription('Select a target to clear their messages.')
        .setRequired(false)
        ),

    async execute(interaction) {
        const {channel, options} = interaction;

        function send_log(guildId, embed) {
            logSchema.findOne({ Guild: guildId }, async (err, data) => {
                if (!data || !data.Channel) return;
                const LogChannel = interaction.client.channels.cache.get(data.Channel);
                embed.setTimestamp();
                LogChannel.send({ embeds: [embed] });
            });
        }

        const amount = options.getInteger('amount');
        const target = options.getUser("target");

        if (interaction.member.roles.cache.some(r=> config.sAll.includes(r.name)) ) {

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor("#0C2037")
   		    .setFooter({ text: "Infinite Designs" });

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Succesfully deleted ${messages.size} messages from ${target}.`);
                interaction.reply({embeds: [res], ephemeral: true}); // you can use ephemeral if you desire
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Succesfully deleted ${messages.size} messages from the channel.`);
                interaction.reply({embeds: [res], ephemeral: true});
            });
        }
    } else {
        return interaction.reply({content: "You do not have permission for this."})
    }
}
}