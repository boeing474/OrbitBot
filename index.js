require('dotenv').config();

const { Client, GatewayIntentBits, Events } = require('discord.js');
const { Client: ClientWA, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// --- CONFIGURAÇÃO ---
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// ID do Fórum do Discord (Avisos)
const ID_FORUM_AVISOS = 'ID_DO_DISCORD'; 

// ID do Grupo do WhatsApp (Grupo do Hacka)
const WHATSAPP_GROUP_ID = 'ID_DO_SEU_GRUPO'; 


const discordClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});


const whatsappClient = new ClientWA({
    authStrategy: new LocalAuth({ dataPath: './wpp_auth' }), 
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});



whatsappClient.on('qr', (qr) => {
    console.log('📱 SCANEIE O QR CODE ABAIXO SE NECESSÁRIO:');
    qrcode.generate(qr, { small: true });
});

whatsappClient.on('ready', () => {
    console.log('✅ WhatsApp conectado e pronto para enviar alertas!');
});


whatsappClient.initialize();


discordClient.once(Events.ClientReady, c => {
    console.log(`✅ Discord conectado como ${c.user.tag}`);
    console.log(`👀 Monitorando o fórum: ${ID_FORUM_AVISOS}`);
});

discordClient.on(Events.ThreadCreate, async (thread) => {
    if (thread.parentId !== ID_FORUM_AVISOS) return;

    console.log(`\n🔎 [PASSO 1] Novo post detectado: "${thread.name}"`);

    try {
        console.log('⏳ [PASSO 2] Esperando 2 segundos para o Discord processar...');
        await new Promise(r => setTimeout(r, 2000)); 

        console.log('⏳ [PASSO 3] Tentando pegar o conteúdo da mensagem...');
        const starterMsg = await thread.fetchStarterMessage().catch(err => {
            console.error('⚠️ Erro ao pegar mensagem (mas vou continuar):', err.message);
            return null;
        });

        const autor = starterMsg ? starterMsg.author.username : "Desconhecido";
        const conteudo = starterMsg ? starterMsg.content : "(Sem conteúdo)";
        const link = `https://discord.com/channels/${thread.guildId}/${thread.id}`;
        
        console.log(`✅ [PASSO 4] Dados pegos! Autor: ${autor} | Conteúdo: ${conteudo}`);

        const textoZap = 
            `🚨 *NOVO AVISO NO DISCORD* 🚨\n\n` +
            `📌 *Título:* ${thread.name}\n` +
            `👤 *Autor:* ${autor}\n\n` +
            `📝 *Mensagem:*\n_${conteudo}_\n\n` +
            `🔗 *Link:* ${link}`;

        console.log('📤 [PASSO 5] Enviando para o WhatsApp...');
        
        await whatsappClient.sendMessage(WHATSAPP_GROUP_ID, textoZap);
        
        console.log(`🚀 [SUCESSO] Alerta enviado para o grupo!\n`);

    } catch (err) {
        console.error('❌ [ERRO CRÍTICO]:', err);
    }
});

discordClient.login(DISCORD_TOKEN);