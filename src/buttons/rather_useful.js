const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('discord.js');
const guildLang = require('../util/Models/guildModel');

module.exports = {
  data: {
    name: 'rather_useful',
    description: 'rather useful',
  },
  async execute(interaction, client) {
    guildLang
      .findOne({ guildID: interaction.guild.id })
      .then(async (result) => {
        const { Rather } = await require(`../languages/${result.language}.json`);
        const { Useless_Powers, Useful_Powers } = await require(`../data/power-${result.language}.json`);
        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Invite')
            .setStyle(5)
            .setEmoji('🤖')
            .setURL(
              'https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=274878294080&scope=bot%20applications.commands',
            ),
        );
        const newButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('New Round')
            .setStyle(1)
            .setEmoji('🔄')
            .setCustomId('rather_useful'),
        );
        let rbutton;
        if (Math.round(Math.random() * 9) < 3) {
          rbutton = [button, newButton];
        } else rbutton = [newButton];
        {
          let usefulpower1 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
          let usefulpower2 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];

          let ratherembed = new EmbedBuilder()
            .setColor('#0598F6')
            .addFields(
              {
                name: Rather.embed.usefulname,
                value: `> 1️⃣ ${usefulpower1}`,
                inline: false,
              },
              {
                name: Rather.embed.usefulname2,
                value: `> 2️⃣ ${usefulpower2}`,
                inline: false,
              },
            )
            .setFooter({
              text: `${Rather.embed.footer}`,
              iconURL: client.user.avatarURL(),
            })
            .setTimestamp();

          let message = await interaction
            .reply({
              embeds: [ratherembed],
              components: rbutton,
              fetchReply: true,
            })
            .catch((err) => {
              return;
            });
        }
      });
  },
};
