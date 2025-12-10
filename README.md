# 🚀 OrbitBot

> **Integração em tempo real entre Discord Forums e Grupos de WhatsApp.**

O **OrbitBot** foi desenvolvido durante o Hackathon da 42 Rio para resolver um problema clássico de comunicação: garantir que avisos importantes postados no Discord cheguem instantaneamente aos cadetes no WhatsApp, onde a atenção é maior.

---

## 🎯 O Problema
A comunidade usa o Discord para documentação e avisos oficiais, mas a comunicação rápida acontece no WhatsApp. Muitas vezes, avisos cruciais no Fórum passam despercebidos.

## 💡 A Solução
Um bot **Middleware** que atua como uma ponte silenciosa:
1. **Monitora** novos tópicos em um canal de Fórum específico do Discord.
2. **Processa** o conteúdo (Autor, Título, Mensagem e Link).
3. **Dispara** uma mensagem formatada para o grupo de avisos no WhatsApp.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Runtime Environment)
* **Discord.js** (Interação com API do Discord)
* **WhatsApp-Web.js** (Automação via Puppeteer)
* **QRCode-Terminal** (Autenticação rápida)

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* Node.js instalado (v18 ou superior)
* Conta no Discord (com permissão de criar Bots)
* Celular com WhatsApp conectado

## 🤖 Configurando o bot do Discord

1. Acesse o Discord para Desenvolvedores:
   ```https://discord.com/developers/applications```
2. Clique em **"New Application"** e dê um nome
3. No menu lateral, vá em **Bot**:
   * Clique em "Reset Token" e **copie o Token** (você precisará dele no Passo 3).
   * ⚠️ **IMPORTANTE:** Role para baixo até a seção **Privileged Gateway Intents**.
   * Ative a opção: **MESSAGE CONTENT INTENT** (Isso permite que o bot leia o que foi escrito).
   * Salve as alterações.
4. No menu lateral, vá em **OAuth2** -> **URL Generator**:
   * Em *Scopes*, marque: `bot`.
   * Em *Bot Permissions*, marque: `View Channels`, `Read Messages/View History`.
   * Copie o link gerado no final da página, cole no navegador e adicione o bot ao seu servidor.

---

## Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone [https://github.com/boeing474/OrbitBot.git](https://github.com/boeing474/OrbitBot.git)
   cd OrbitBot
2. Instalar Dependências
   ```npm install```
3. Configurar Variáveis de Ambiente
   Crie um arquivo chamado *.env* na raiz do projeto e preencha do seguinte jeito

   •Token do seu Bot do Discord:
   *DISCORD_TOKEN='seu_token_aqui_sem_aspas'*

   •ID do Canal/Forum do Discord que será monitorado:
   
   `(Ative o Modo Desenvolvedor no Discord -> Clique direito no canal -> Copiar ID)`
   *DISCORD_FORUM_ID='SEU_ID_sem_aspas'*

   •ID do Grupo do WhatsApp para onde as mensagens vão:
   
   *WHATSAPP_GROUP_ID='010101010228@g.usdontp_sem_aspas'*

5. Executar
   ```node index.js```
   Ao rodar pela primeira vez, um QR Code aparecerá no terminal. Escaneie com seu WhatsApp (Dispositivos Conectados) para autenticar.
