const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// The two channels where the bot will react to "wfl"
const WFL_CHANNEL_IDS = [
    '1488846094950731856',
    '1330295353228001410'
];

client.once('clientReady', async () => {
    console.log(`✅ WFL Reaction Bot is online and watching ${WFL_CHANNEL_IDS.length} channels`);
});

client.on('messageCreate', async message => {
    // Only work in the two allowed channels
    if (!WFL_CHANNEL_IDS.includes(message.channel.id)) return;
    if (message.author.bot) return;

    const content = message.content.toLowerCase();

    if (content.includes('wfl')) {
        try {
            await message.react('🇼');  // W
            await message.react('🇫');  // F
            await message.react('🇱');  // L
            console.log(`✅ Reacted W F L to message in channel ${message.channel.id}`);
        } catch (err) {
            console.error('Failed to add reactions:', err.message);
        }
    }
});

client.login(process.env.TOKEN);
