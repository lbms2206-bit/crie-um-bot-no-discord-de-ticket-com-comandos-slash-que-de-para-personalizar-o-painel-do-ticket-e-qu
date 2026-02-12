import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from 'discord.js';
import { updatePanelConfig } from '../config/panel-config';

export const customizePanelCommand = {
  data: new SlashCommandBuilder()
    .setName('customize-panel')
    .setDescription('Personaliza o painel de tickets')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName('titulo')
        .setDescription('Título do painel')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('descricao')
        .setDescription('Descrição do painel')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('cor')
        .setDescription('Cor do embed (ex: #5865F2)')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('emoji')
        .setDescription('Emoji do painel (ex: 🎫)')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('botao-texto')
        .setDescription('Texto do botão')
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName('botao-estilo')
        .setDescription('Estilo do botão')
        .setRequired(false)
        .addChoices(
          { name: 'Azul (Primary)', value: 'PRIMARY' },
          { name: 'Cinza (Secondary)', value: 'SECONDARY' },
          { name: 'Verde (Success)', value: 'SUCCESS' },
          { name: 'Vermelho (Danger)', value: 'DANGER' }
        )
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const titulo = interaction.options.getString('titulo');
    const descricao = interaction.options.getString('descricao');
    const cor = interaction.options.getString('cor');
    const emoji = interaction.options.getString('emoji');
    const botaoTexto = interaction.options.getString('botao-texto');
    const botaoEstilo = interaction.options.getString('botao-estilo');

    // Atualiza a configuração
    const updates: any = {};
    if (titulo) updates.title = titulo;
    if (descricao) updates.description = descricao;
    if (cor) updates.color = cor;
    if (emoji) updates.emoji = emoji;
    if (botaoTexto) updates.buttonLabel = botaoTexto;
    if (botaoEstilo) updates.buttonStyle = botaoEstilo;

    if (Object.keys(updates).length === 0) {
      return interaction.reply({
        content: '❌ Você precisa fornecer pelo menos uma opção para personalizar!',
        ephemeral: true,
      });
    }

    updatePanelConfig(updates);

    let response = '✅ Painel personalizado com sucesso!\n\n**Alterações:**\n';
    if (titulo) response += `• Título: ${titulo}\n`;
    if (descricao) response += `• Descrição: ${descricao}\n`;
    if (cor) response += `• Cor: ${cor}\n`;
    if (emoji) response += `• Emoji: ${emoji}\n`;
    if (botaoTexto) response += `• Texto do botão: ${botaoTexto}\n`;
    if (botaoEstilo) response += `• Estilo do botão: ${botaoEstilo}\n`;

    response += '\n💡 Use `/setup-panel` novamente para aplicar as mudanças!';

    await interaction.reply({
      content: response,
      ephemeral: true,
    });
  },
};
