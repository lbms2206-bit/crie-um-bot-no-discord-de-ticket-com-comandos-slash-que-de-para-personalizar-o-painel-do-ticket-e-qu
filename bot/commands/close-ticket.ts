import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  TextChannel,
  EmbedBuilder,
} from 'discord.js';

export const closeTicketCommand = {
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Fecha o ticket atual'),

  async execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.channel as TextChannel;

    // Verifica se é um canal de ticket
    if (!channel.parentId || channel.parentId !== process.env.TICKET_CATEGORY_ID) {
      return interaction.reply({
        content: '❌ Este comando só pode ser usado em canais de ticket!',
        ephemeral: true,
      });
    }

    await interaction.reply('🔒 Fechando ticket em 5 segundos...');

    // Log do fechamento
    const logChannelId = process.env.LOG_CHANNEL_ID;
    if (logChannelId) {
      const logChannel = interaction.guild?.channels.cache.get(
        logChannelId
      ) as TextChannel;
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setTitle('Ticket Fechado')
          .setDescription(
            `${interaction.user.tag} fechou o ticket: ${channel.name}`
          )
          .setColor(0xff0000)
          .setTimestamp();

        await logChannel.send({ embeds: [logEmbed] });
      }
    }

    setTimeout(async () => {
      await channel.delete();
    }, 5000);
  },
};
