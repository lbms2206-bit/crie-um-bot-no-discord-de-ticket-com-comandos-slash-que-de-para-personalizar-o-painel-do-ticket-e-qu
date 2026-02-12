import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  TextChannel,
  PermissionFlagsBits,
} from 'discord.js';

export const addUserCommand = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adiciona um usuário ao ticket')
    .addUserOption((option) =>
      option
        .setName('usuario')
        .setDescription('Usuário para adicionar')
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const channel = interaction.channel as TextChannel;

    // Verifica se é um canal de ticket
    if (!channel.parentId || channel.parentId !== process.env.TICKET_CATEGORY_ID) {
      return interaction.reply({
        content: '❌ Este comando só pode ser usado em canais de ticket!',
        ephemeral: true,
      });
    }

    const user = interaction.options.getUser('usuario', true);

    try {
      await channel.permissionOverwrites.create(user.id, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true,
      });

      await interaction.reply({
        content: `✅ ${user} foi adicionado ao ticket!`,
      });
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      await interaction.reply({
        content: '❌ Erro ao adicionar o usuário ao ticket.',
        ephemeral: true,
      });
    }
  },
};
