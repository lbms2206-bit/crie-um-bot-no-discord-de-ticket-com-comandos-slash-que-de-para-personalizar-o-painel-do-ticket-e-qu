import {
  Client,
  ButtonInteraction,
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
} from 'discord.js';
import { getPanelConfig } from './config/panel-config';

// Armazena tickets ativos por usuário
const activeTickets = new Map<string, string>();

export async function setupTicketSystem(client: Client) {
  console.log('✅ Sistema de tickets configurado!');
}

export async function handleTicketButton(interaction: ButtonInteraction) {
  if (interaction.customId === 'create_ticket') {
    await createTicket(interaction);
  } else if (interaction.customId === 'close_ticket') {
    await closeTicket(interaction);
  }
}

async function createTicket(interaction: ButtonInteraction) {
  const userId = interaction.user.id;
  const guild = interaction.guild!;
  const config = getPanelConfig();

  // Verifica se o usuário já tem um ticket aberto
  if (activeTickets.has(userId)) {
    const channelId = activeTickets.get(userId);
    return interaction.reply({
      content: `❌ Você já tem um ticket aberto: <#${channelId}>`,
      ephemeral: true,
    });
  }

  // Verifica limite de tickets
  const userTickets = guild.channels.cache.filter(
    (ch) =>
      ch.name.includes(interaction.user.username.toLowerCase()) &&
      ch.parentId === process.env.TICKET_CATEGORY_ID
  );

  const maxTickets = parseInt(process.env.MAX_TICKETS_PER_USER || '3');
  if (userTickets.size >= maxTickets) {
    return interaction.reply({
      content: `❌ Você atingiu o limite de ${maxTickets} tickets abertos!`,
      ephemeral: true,
    });
  }

  await interaction.deferReply({ ephemeral: true });

  try {
    // Cria o canal do ticket
    const ticketName = process.env.TICKET_NAME_FORMAT?.replace(
      '{username}',
      interaction.user.username.toLowerCase()
    ) || `ticket-${interaction.user.username.toLowerCase()}`;

    const ticketChannel = await guild.channels.create({
      name: ticketName,
      type: ChannelType.GuildText,
      parent: process.env.TICKET_CATEGORY_ID,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
        {
          id: process.env.SUPPORT_ROLE_ID!,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ],
        },
      ],
    });

    // Adiciona à lista de tickets ativos
    activeTickets.set(userId, ticketChannel.id);

    // Cria embed de boas-vindas
    const welcomeEmbed = new EmbedBuilder()
      .setTitle('🎫 Ticket Criado')
      .setDescription(
        `Olá ${interaction.user}, bem-vindo ao seu ticket!\n\nDescreva seu problema ou dúvida e nossa equipe irá te ajudar em breve.`
      )
      .setColor(config.color as any)
      .setTimestamp();

    // Botão para fechar ticket
    const closeButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('🔒 Fechar Ticket')
        .setStyle(ButtonStyle.Danger)
    );

    await ticketChannel.send({
      content: `${interaction.user} <@&${process.env.SUPPORT_ROLE_ID}>`,
      embeds: [welcomeEmbed],
      components: [closeButton],
    });

    // Log do ticket
    await logTicketAction(
      guild,
      'Ticket Criado',
      `${interaction.user.tag} criou um ticket: ${ticketChannel}`,
      0x00ff00
    );

    await interaction.editReply({
      content: `✅ Ticket criado com sucesso! ${ticketChannel}`,
    });
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    await interaction.editReply({
      content: '❌ Erro ao criar o ticket. Verifique as permissões do bot.',
    });
  }
}

async function closeTicket(interaction: ButtonInteraction) {
  const channel = interaction.channel as TextChannel;

  if (!channel.parentId || channel.parentId !== process.env.TICKET_CATEGORY_ID) {
    return interaction.reply({
      content: '❌ Este comando só pode ser usado em canais de ticket!',
      ephemeral: true,
    });
  }

  await interaction.reply('🔒 Fechando ticket em 5 segundos...');

  // Remove da lista de tickets ativos
  for (const [userId, channelId] of activeTickets.entries()) {
    if (channelId === channel.id) {
      activeTickets.delete(userId);
      break;
    }
  }

  // Log do fechamento
  await logTicketAction(
    interaction.guild!,
    'Ticket Fechado',
    `${interaction.user.tag} fechou o ticket: ${channel.name}`,
    0xff0000
  );

  setTimeout(async () => {
    await channel.delete();
  }, 5000);
}

async function logTicketAction(
  guild: any,
  title: string,
  description: string,
  color: number
) {
  const logChannelId = process.env.LOG_CHANNEL_ID;
  if (!logChannelId) return;

  const logChannel = guild.channels.cache.get(logChannelId) as TextChannel;
  if (!logChannel) return;

  const logEmbed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();

  await logChannel.send({ embeds: [logEmbed] });
}
