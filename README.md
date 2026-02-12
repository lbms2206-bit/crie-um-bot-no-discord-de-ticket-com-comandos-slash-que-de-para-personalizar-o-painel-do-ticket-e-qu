# 🎫 Discord Ticket Bot

Bot de Discord com sistema de tickets completo e comandos slash personalizáveis!

## 📋 Funcionalidades

- ✅ Sistema de tickets com painel personalizável
- ✅ Comandos slash para gerenciar tickets
- ✅ Personalização completa do painel (título, descrição, cor, emoji, botão)
- ✅ Limite de tickets por usuário
- ✅ Sistema de logs
- ✅ Adicionar/remover usuários de tickets
- ✅ Permissões configuráveis

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone <seu-repositorio>
cd discord-ticket-bot
```

### 2. Instale as dependências

```bash
bun install
```

### 3. Configure o arquivo .env

Edite o arquivo [`.env`](.env) com suas informações:

```env
# Discord Bot Configuration
DISCORD_TOKEN=seu_token_do_bot_aqui
CLIENT_ID=seu_client_id_aqui
GUILD_ID=seu_server_id_aqui

# Ticket System Configuration
TICKET_CATEGORY_ID=id_da_categoria_de_tickets
LOG_CHANNEL_ID=id_do_canal_de_logs

# Panel Customization
PANEL_TITLE=Sistema de Tickets
PANEL_DESCRIPTION=Clique no botão abaixo para abrir um ticket!
PANEL_COLOR=#5865F2
PANEL_EMOJI=🎫
BUTTON_LABEL=Abrir Ticket
BUTTON_STYLE=PRIMARY

# Ticket Settings
MAX_TICKETS_PER_USER=3
TICKET_NAME_FORMAT=ticket-{username}
SUPPORT_ROLE_ID=id_do_cargo_de_suporte
```

### 4. Como obter as informações necessárias

#### Token do Bot e Client ID

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications)
2. Crie uma nova aplicação ou selecione uma existente
3. Vá em "Bot" e copie o **Token** (DISCORD_TOKEN)
4. Vá em "OAuth2" e copie o **Application ID** (CLIENT_ID)

#### Guild ID (ID do Servidor)

1. Ative o Modo Desenvolvedor no Discord (Configurações > Avançado > Modo Desenvolvedor)
2. Clique com o botão direito no seu servidor e selecione "Copiar ID"

#### Category ID e Channel IDs

1. Com o Modo Desenvolvedor ativado
2. Clique com o botão direito na categoria/canal e selecione "Copiar ID"

#### Support Role ID

1. Clique com o botão direito no cargo de suporte e selecione "Copiar ID"

### 5. Convide o bot para seu servidor

Use este link (substitua CLIENT_ID pelo seu):

```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

### 6. Inicie o bot

```bash
bun run bot
```

Ou para desenvolvimento com auto-reload:

```bash
bun run bot:dev
```

## 📝 Comandos

### `/setup-panel`
Configura o painel de tickets no canal atual.

**Permissão necessária:** Administrador

**Exemplo:**
```
/setup-panel
```

### `/customize-panel`
Personaliza o painel de tickets.

**Permissão necessária:** Administrador

**Opções:**
- `titulo` - Título do painel
- `descricao` - Descrição do painel
- `cor` - Cor do embed (ex: #5865F2)
- `emoji` - Emoji do painel (ex: 🎫)
- `botao-texto` - Texto do botão
- `botao-estilo` - Estilo do botão (Primary, Secondary, Success, Danger)

**Exemplo:**
```
/customize-panel titulo:Suporte descricao:Precisa de ajuda? cor:#00ff00 emoji:🆘
```

### `/close`
Fecha o ticket atual.

**Exemplo:**
```
/close
```

### `/add`
Adiciona um usuário ao ticket.

**Opções:**
- `usuario` - Usuário para adicionar

**Exemplo:**
```
/add usuario:@Usuario
```

### `/remove`
Remove um usuário do ticket.

**Opções:**
- `usuario` - Usuário para remover

**Exemplo:**
```
/remove usuario:@Usuario
```

## 🎨 Personalização

### Estilos de Botão Disponíveis

- `PRIMARY` - Azul (padrão)
- `SECONDARY` - Cinza
- `SUCCESS` - Verde
- `DANGER` - Vermelho

### Formato do Nome do Ticket

No arquivo [`.env`](.env), você pode personalizar o formato do nome do ticket:

```env
TICKET_NAME_FORMAT=ticket-{username}
```

A variável `{username}` será substituída pelo nome do usuário.

## 📁 Estrutura do Projeto

```
bot/
├── index.ts                 # Arquivo principal do bot
├── deploy-commands.ts       # Deploy dos comandos slash
├── ticket-system.ts         # Sistema de tickets
├── commands/                # Comandos slash
│   ├── setup-panel.ts       # Comando /setup-panel
│   ├── customize-panel.ts   # Comando /customize-panel
│   ├── close-ticket.ts      # Comando /close
│   ├── add-user.ts          # Comando /add
│   └── remove-user.ts       # Comando /remove
├── config/                  # Configurações
│   └── panel-config.ts      # Configuração do painel
└── types/                   # Tipos TypeScript
    └── discord.d.ts         # Tipos do Discord.js
```

## 🔧 Configuração Avançada

### Limite de Tickets por Usuário

Edite no [`.env`](.env):

```env
MAX_TICKETS_PER_USER=3
```

### Categoria de Tickets

Crie uma categoria no seu servidor Discord e coloque o ID no [`.env`](.env):

```env
TICKET_CATEGORY_ID=id_da_categoria
```

### Canal de Logs

Crie um canal para logs e coloque o ID no [`.env`](.env):

```env
LOG_CHANNEL_ID=id_do_canal
```

## 🐛 Solução de Problemas

### Bot não responde aos comandos

1. Verifique se o bot está online
2. Verifique se os comandos foram registrados (veja o console)
3. Verifique as permissões do bot no servidor

### Erro ao criar ticket

1. Verifique se o `TICKET_CATEGORY_ID` está correto
2. Verifique se o bot tem permissões para criar canais
3. Verifique se o `SUPPORT_ROLE_ID` está correto

### Comandos não aparecem

1. Verifique se o `CLIENT_ID` e `GUILD_ID` estão corretos
2. Aguarde alguns minutos (pode demorar para sincronizar)
3. Reinicie o bot

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📞 Suporte

Se você tiver alguma dúvida ou problema, abra uma issue no GitHub!

---

Feito com ❤️ usando Discord.js e TypeScript
