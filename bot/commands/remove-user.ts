import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  TextChannel,
} from 'discord.js';

export const removeUserCommand = {
  data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove um usuário do ticket')
    .addUserOption((option) =>
      option
        .setName('usuario')
        .setDescription('Usuário para remover')
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
      await channel.permissionOverwrites.delete(user.id);

      await interaction.reply({
        content: `✅ ${user} foi removido do ticket!`,
      });
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      await interaction.reply({
        content: '❌ Erro ao remover o usuário do ticket.',
        ephemeral: true,
      });
    }
  },
};
