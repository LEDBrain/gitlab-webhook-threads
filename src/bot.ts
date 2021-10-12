import { Client, Intents, Message, TextChannel } from 'discord.js';
require('dotenv').config();

import './server';

import WebhookEvent from './events/WebhookEvent';

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
    console.log('Logged in as', client.user.tag);
});

WebhookEvent.on('post', async (post: Message) => {
    console.log(post);

    const regexInner = `.+(?: \\/ .+)*?(?=]\\(https:\\/\\/gitlab\\.com\\/${process.env.GITLAB_ORG_NAME.toLowerCase()}\\/[a-z\\-\\/]+\\)`;
    const regex = new RegExp(`(?<=\\[${process.env.GITLAB_ORG_NAME} / )${regexInner})|(?<=\\[)${regexInner}: Pipeline)`);

    const matches = post.embeds[0].description.match(regex);

    if (!matches) return;

    if (post.embeds[0].description.match(/Pipeline/)) {
        if (post.embeds[0].description.match(/passed/)) post.embeds[0].color = 123456;
        else if (post.embeds[0].description.match(/failed/)) post.embeds[0].color = 16711680;
    }

    matches[0] = matches[0].replace(new RegExp(`${process.env.GITLAB_ORG_NAME} /(?: .*? \\/)* `), '').replace(/\//g, '–');

    const channel = (await client.channels.fetch(
        process.env.CHANNEL_ID
    )) as TextChannel;

    const allThreads = (
        await channel.threads.fetchActive(false)
    ).threads.concat(
        (await channel.threads.fetchArchived({ fetchAll: true }, false)).threads
    );

    let thread = allThreads.find((th) => th.name === matches[0]);

    thread ??= await channel.threads.create({
        name: matches[0],
        autoArchiveDuration: 60,
    });

    thread.send({ embeds: post.embeds });
});

client.login(process.env.DISCORD_TOKEN);
