import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} from 'discord.js';
import { getPanelConfig } from '../config/panel-config';

export const setupPanelCommand = {
  data: new SlashCommandBuilder()
    .setName('setup-panel')
    .setDescription('Configura o painel de tickets no canal atual')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction: ChatInputCommandInteraction) {
    const config = getPanelConfig();

    // Cria o embed do painel
    const panelEmbed = new EmbedBuilder()
      .setTitle(`${config.emoji} ${config.title}`)
      .setDescription(config.description)
      .setColor(config.color as any)
      .setFooter({ text: 'Clique no botão abaixo para abrir um ticket' })
      .setTimestamp();

    // Mapeia o estilo do botão
    const buttonStyleMap: Record<string, ButtonStyle> = {
      PRIMARY: ButtonStyle.Primary,
      SECONDARY: ButtonStyle.Secondary,
      SUCCESS: ButtonStyle.Success,
      DANGER: ButtonStyle.Danger,
    };

    // Cria o botão
    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('create_ticket')
        .setLabel(config.buttonLabel)
        .setEmoji(config.emoji)
        .setStyle(buttonStyleMap[config.buttonStyle] || ButtonStyle.Primary)
    );

    // Envia o painel
    await interaction.channel?.send({
      embeds: [panelEmbed],
      components: [button],
    });

    await interaction.reply({
      content: '✅ Painel de tickets configurado com sucesso!',
      ephemeral: true,
    });
  },
};
