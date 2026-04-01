const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const WFL_CHANNEL_ID = '1488846094950731856';

client.once('clientReady', async () => {
    console.log(`✅ WFL Reaction Bot is online`);
});

client.on('messageCreate', async message => {
    if (message.channel.id !== WFL_CHANNEL_ID) return;
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content.includes('wfl')) {
        try {
            await message.react('🇼');  // W
            await message.react('🇫');  // F
            await message.react('🇱');  // L
            console.log(`Reacted WFL to message from ${message.author.tag}`);
        } catch (err) {
            console.error('Failed to add reactions:', err.message);
        }
    }
});

client.login(process.env.TOKEN);
