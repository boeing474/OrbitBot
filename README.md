# 🤖 Bot de Integração (Discord ↔ WhatsApp)

Bot desenvolvido para o **Hackathon 42 Rio**.
Ele conecta um servidor do Discord com um grupo do WhatsApp. A ideia é simples: ele fica lendo o chat do Discord e, quando alguém marca `@cadetes` (ou manda um aviso importante), ele pega essa mensagem e encaminha automaticamente para o grupo do Zap.

## ⚡ Passo a Passo para Rodar

### 1. Clonar o repositório
Baixe o código para sua máquina:
```bash
git clone [https://github.com/boeing474/hackathon-42rio-bot.git](https://github.com/boeing474/hackathon-42rio-bot.git)
cd hackathon-42rio-bot
```
### 2. Instalar as dependências
Isso vai baixar as bibliotecas necessárias (discord.js, whatsapp-web, etc).

```npm install```
Dica 42: Se estiver nos computadores do campus, faça isso dentro da pasta /goinfre para não estourar o espaço da home.

### 3. Configurar as Chaves
As senhas não ficam no código. Crie um arquivo chamado .env na raiz da pasta e cole o conteúdo abaixo (substituindo pelos seus dados):

# Token do Bot (Pegue no Discord Developer Portal)
DISCORD_TOKEN=TOKEN_DO_BOT_AQUI

# ID do Grupo do WhatsApp (Use o comando !id para descobrir)
# Exemplo: 120363XXXXXXXX@g.us
WHATSAPP_GROUP_ID=

# Chave da OpenAI 
OPENAI_KEY=sk-XXXXXXXXXX

### 4. Botar para rodar

```node index.js```
1. Um QR Code vai aparecer no terminal.

2. Abra o WhatsApp no celular > Aparelhos Conectados > Conectar.

3. Escaneie o código.

4. Aguarde aparecer a mensagem: ✅ WhatsApp conectado!.

### COMANDOS
Comando,Onde digitar?,O que ele faz?
!id,WhatsApp,Mostra o ID do chat atual (útil para configurar o .env).
!dispararNews,Discord,Pega as mensagens salvas e envia a Newsletter agora.
!limparNews,Discord,Apaga a memória de notícias do dia (reset).

### DEU RUIM?
O bot conectou mas não manda mensagem: Apague a pasta wpp_auth (que foi criada sozinha na pasta do projeto) e rode de novo. Isso reseta a conexão do WhatsApp.

Erro de espaço (ENOSPC): O disco tá cheio. Apague a pasta node_modules e instale tudo de novo na pasta /goinfre.

O bot não lê as mensagens: Vá no Discord Developer Portal > Bot > Privileged Gateway Intents e ative a opção "Message Content Intent".
