require('dotenv').config(); // Carrega as chaves do arquivo .env

const { Client, GatewayIntentBits } = require('discord.js');
const { Client: ClientWA, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// --- CONFIGURAÇÃO ---
// ⚠️ SUBSTITUA PELOS SEUS DADOS:
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const WHATSAPP_GROUP_ID = '120363422815325357@g.us'; // Digitar em algum chat !id e ele vai ver o id do grupo/chat
const ID_CARGO_STAFF = '123456789'; // ID do cargo Staff
const ID_CARGO_CADETES = '987654321'; // ID do cargo Cadetes (opcional se usar string)

// Memória simples
let noticiasDoDia = [];

// --- 1. CLIENTE DISCORD ---
const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// --- 2. CLIENTE WHATSAPP ---
const whatsappClient = new ClientWA({
    authStrategy: new LocalAuth({ dataPath: './wpp_auth' }), // Salva login na pasta local
    puppeteer: {
        headless: true, // Roda sem abrir janela do Chrome
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Importante para Linux/Ambiente 42
    }
});

// --- LÓGICA WHATSAPP ---
whatsappClient.on('qr', (qr) => {
    console.log('📱 SCANEIE O QR CODE ABAIXO:');
    qrcode.generate(qr, { small: true });
});

whatsappClient.on('ready', () => {
    console.log('✅ WhatsApp conectado!');
});

// Comando para descobrir ID do grupo
whatsappClient.on('message_create', async msg => {
    console.log(`👂 Ouvi: "${msg.body}"`); // <--- ISSO VAI TE CONTAR O QUE ESTÁ CHEGANDO)
    if(msg.body.trim() === '!id') {
        const chat = await msg.getChat();
        console.log(`🆔 ID DO CHAT: ${chat.id._serialized}`);
        msg.reply(`ID: ${chat.id._serialized}`);
    }
});

whatsappClient.initialize();

// --- LÓGICA DISCORD ---
discordClient.on('ready', () => {
    console.log(`✅ Discord conectado como ${discordClient.user.tag}`);
});

discordClient.on('messageCreate', message => {
    if (message.author.bot) return;

    // Critérios de filtro
    const mencionouCadetes = message.content.includes('@cadetes'); // Jeito simples
    // Se quiser por cargo, descomente a linha abaixo e configure o ID lá em cima
    // const temCargoStaff = message.member.roles.cache.has(ID_CARGO_STAFF);

    if (mencionouCadetes) { // Adicione '|| temCargoStaff' aqui se quiser
        const noticia = {
            autor: message.author.username,
            msg: message.content,
            canal: message.channel.name,
            link: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`,
            hora: new Date().toLocaleTimeString('pt-BR')
        };
        
        noticiasDoDia.push(noticia);
        console.log(`📌 Notícia capturada de ${noticia.autor}`);
        message.react('✅'); // Feedback visual no Discord
    }

    // Comando para disparar
    if (message.content === '!dispararNews') {
        enviarNewsletter();
    }
});

// --- FUNÇÃO DE ENVIO ---
async function enviarNewsletter() {
    if (noticiasDoDia.length === 0) return console.log('Nada para enviar.');

    let texto = `*📢 PLANTÃO 42 RIO - ${new Date().toLocaleDateString('pt-BR')}*\n\n`;

    noticiasDoDia.forEach((n, i) => {
        texto += `*${i+1}. ${n.autor}* em #${n.canal} [${n.hora}]\n`;
        texto += `_${n.msg}_\n`;
        texto += `🔗 ${n.link}\n\n`;
    });

    try {
        await whatsappClient.sendMessage(WHATSAPP_GROUP_ID, texto);
        console.log('🚀 Enviado para o WhatsApp!');
        noticiasDoDia = []; // Limpa a lista
    } catch (e) {
        console.error('Erro no envio:', e);
    }
}

discordClient.login(DISCORD_TOKEN);