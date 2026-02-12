import { Client, REST, Routes } from 'discord.js';
import { setupPanelCommand } from './commands/setup-panel';
import { customizePanelCommand } from './commands/customize-panel';
import { closeTicketCommand } from './commands/close-ticket';
import { addUserCommand } from './commands/add-user';
import { removeUserCommand } from './commands/remove-user';

export async function deployCommands(client: Client) {
  const commands = [
    setupPanelCommand,
    customizePanelCommand,
    closeTicketCommand,
    addUserCommand,
    removeUserCommand,
  ];

  // Registra os comandos na coleção do cliente
  commands.forEach((command) => {
    client.commands.set(command.data.name, command);
  });

  // Deploy dos comandos no Discord
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

  try {
    console.log('🔄 Registrando comandos slash...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!
      ),
      { body: commands.map((cmd) => cmd.data.toJSON()) }
    );

    console.log('✅ Comandos slash registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
}
