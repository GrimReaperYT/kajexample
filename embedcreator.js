const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../../config.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embedcreator")
    .setDescription(`Make a new embed`)
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription(`This is the title of the embed`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription(`This is the description of the embed (use \\n to create paragraphs)`)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription(`This is the image for the embed`)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription(`This is the thumbnail for the embed`)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("footer")
        .setDescription(`This is the footer of the embed`)
        .setRequired(false)
    )
    .addBooleanOption((option) =>
      option
        .setName("inline")
        .setDescription(`Should this field be inline?`)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("fields")
        .setDescription(
          `Field titles and values (format: title1;value1\\nvalue1Paragraph2,title2;value2)`
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("Select an available Discord.js 14 embed color")
        .setRequired(false)
        .addChoices(
          { name: 'Default', value: 'Default' },
          { name: 'Reborn', value: '#0C2037' },
          { name: 'Aqua', value: 'Aqua' },
          { name: 'DarkAqua', value: 'DarkAqua' },
          { name: 'Green', value: 'Green' },
          { name: 'DarkGreen', value: 'DarkGreen' },
          { name: 'Blue', value: 'Blue' },
          { name: 'DarkBlue', value: 'DarkBlue' },
          { name: 'Purple', value: 'Purple' },
          { name: 'DarkPurple', value: 'DarkPurple' },
          { name: 'LuminousVividPink', value: 'LuminousVividPink' },
          { name: 'DarkVividPink', value: 'DarkVividPink' },
          { name: 'Gold', value: 'Gold' },
          { name: 'DarkGold', value: 'DarkGold' },
          { name: 'Orange', value: 'Orange' },
          { name: 'DarkOrange', value: 'DarkOrange' },
          { name: 'Red', value: 'Red' },
          { name: 'DarkRed', value: 'DarkRed' },
          { name: 'Grey', value: 'Grey' },
          { name: 'DarkGrey', value: 'DarkGrey' },
          { name: 'DarkerGrey', value: 'DarkerGrey' },
          { name: 'LightGrey', value: 'LightGrey' },
          { name: 'Navy', value: 'Navy' },
          { name: 'DarkNavy', value: 'DarkNavy' },
          { name: 'Yellow', value: 'Yellow' }
       
    )),

  async execute(interaction) {
    const { options } = interaction;

    if (interaction.member.roles.cache.some(r=> config.sManagement.includes(r.name)) ) {

    const title = options.getString("title");
    const description = options.getString("description").replace(/\\n/g, "\n");
    const image = options.getString("image");
    const thumbnail = options.getString("thumbnail");
    const footer = options.getString("footer") || " ";
    const color = interaction.options.getString("color");

    let fields = [];

    const fieldsOption = options.getString("fields");
    if (fieldsOption) {
      const fieldPairs = fieldsOption.split(",");
      for (const fieldPair of fieldPairs) {
        const [fieldName, fieldValue] = fieldPair.split(";");
        fields.push({
          name: fieldName,
          value: fieldValue.replace(/\\n/g, "\n"),
          inline: options.getBoolean("inline") || false,
        });
      }
    }

    if (image) {
      if (!image.startsWith("http"))
        return await interaction.reply({
          content: "You cannot make this your image",
          ephemeral: true,
        });
    }

    if (thumbnail) {
      if (!thumbnail.startsWith("http"))
        return await interaction.reply({
          content: "You cannot make this your thumbnail",
          ephemeral: true,
        });
    }

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setImage(image)
      .setThumbnail(thumbnail)
      .addFields(fields)
      .setFooter({
        text: `${footer}`,
        iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
      });

    await interaction.reply({
      content: "Your embed has been created",
      ephemeral: true,
    });

    await interaction.channel.send({ embeds: [embed] });
    }
  }
}