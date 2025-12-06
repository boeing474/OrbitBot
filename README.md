# 🤖 Bot de Integração (Discord ↔ WhatsApp)

Esse bot conecta um servidor do Discord com um grupo do WhatsApp.
A ideia é simples: ele fica lendo o chat do Discord e, quando alguém marca `@cadetes` (ou manda um aviso importante), ele pega essa mensagem e encaminha automaticamente para o grupo do Zap.

## ⚡ Passo a Passo para Rodar

### 1. Clonar o repositório
Baixe o código para sua máquina:
```bash
git clone [https://github.com/boeing474/hackathon-42rio-bot.git](https://github.com/boeing474/hackathon-42rio-bot.git)
cd hackathon-42rio-bot

2. Instalar as dependências
Isso vai baixar as bibliotecas necessárias (discord.js, whatsapp-web, etc).
COMANDO: **(Bash) npm install**Snippet de código
Dica pra quem tá na 42: Façam isso dentro da pasta /goinfre para não estourar o espaço da home.

3. Configurar as Chaves
As senhas não ficam no código (por segurança). Você precisa criar um arquivo chamado .env na raiz da pasta (onde fica o package.json) e colar isso aqui dentro:

# Token do Bot (Pega lá no Discord Developer Portal)
DISCORD_TOKEN=COLE_SEU_TOKEN_AQUI

# ID do Grupo do WhatsApp que vai receber as mensagens
# (Se não souber, deixa vazio, roda o bot e usa o comando !id no grupo pra descobrir)
WHATSAPP_GROUP_ID=120363XXXXXXXX@g.us

#  Chave da OpenAI
OPENAI_KEY=sk-XXXXXXXXXX

4. Botar pra rodarBashnode index.js
Vai aparecer um QR Code gigante no terminal.Abre o WhatsApp no celular > Aparelhos Conectados > Conectar.Escaneia o código.
Espera aparecer: ✅ WhatsApp conectado!.

🎮 Comandos:

Comando:!id (No Whatsapp)
-Bot responde com o ID do chat atual (útil pra preencher o .env)
Comando:!dispararNews (No Discord)
-Pega as notícias acumuladas e manda pro Zap
Comando: !limparNews
-Limpa a memória se você salvou algo errado.

🆘 Deu ruim?
O bot conectou mas não manda mensagem:Apague a pasta wpp_auth (que foi criada sozinha na pasta do projeto) e rode de novo. Isso reseta a conexão do WhatsApp.
Erro de espaço (ENOSPC):O disco tá cheio. Apaga a pasta node_modules e tenta instalar de novo no /goinfre.
O bot não lê as mensagens:Confere se você ativou o "Message Content Intent" lá no site do Discord Developer (na aba Bot). Sem isso ele fica surdo.
