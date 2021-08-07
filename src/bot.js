const { Client, Intents } = require('discord.js');
require('dotenv').config();

require('./server.js');

const WebhookEvent = require('./events/WebhookEvent.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
    console.log('Logged in as', client.user.tag);
});

WebhookEvent.on('post', async (post) => {
    console.log(post);

    const regex =
        /(?<=\[LEDBrain \/ ).+(?: \/ .+)*?(?=]\(https:\/\/gitlab\.com\/ledbrain\/[a-z\-\/]+\))/;

    const matches = post.embeds[0].description.match(regex);

    if (!matches) return;

    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    let thread = (
        await channel.threads.fetch(null, { force: true })
    ).threads.find((th) => th.name === matches[0]);

    if (!thread) {
        thread = await channel.threads.create({
            name: matches[0],
        });
    }

    thread.send({ embeds: post.embeds });
});

client.login(process.env.DISCORD_TOKEN);
