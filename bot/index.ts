import { Client, GatewayIntentBits, Collection } from 'discord.js';
import dotenv from 'dotenv';
import { deployCommands } from './deploy-commands';
import { setupTicketSystem } from './ticket-system';

// Carrega variáveis de ambiente
dotenv.config();

// Cria o cliente do bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Coleção de comandos
client.commands = new Collection();

// Evento quando o bot está pronto
client.once('ready', async () => {
  console.log(`✅ Bot online como ${client.user?.tag}!`);
  
  // Deploy dos comandos slash
  await deployCommands(client);
  
  // Configura o sistema de tickets
  await setupTicketSystem(client);
});

// Handler de interações (comandos slash e botões)
client.on('interactionCreate', async (interaction) => {
  // Comandos slash
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    
    if (!command) return;
    
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error('Erro ao executar comando:', error);
      await interaction.reply({
        content: '❌ Ocorreu um erro ao executar este comando!',
        ephemeral: true,
      });
    }
  }
  
  // Botões de ticket
  if (interaction.isButton()) {
    const { handleTicketButton } = await import('./ticket-system');
    await handleTicketButton(interaction);
  }
});

// Login do bot
client.login(process.env.DISCORD_TOKEN);

// Exporta o cliente
export default client;
