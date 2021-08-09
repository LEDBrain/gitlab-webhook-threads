# gitlab-webhook-threads

ToDo: add a description of what this is.
## Configuration

### Requirements

-   Node.js v16.6.0 or higher

### Building the bot

1. Download or clone the repo (or download the latest `Source Code` zip from the [releases page](https://github.com/LEDBrain/gitlab-webhook-threads/releases) and unpack it)
2. Edit `.env.example` and add the required configurations (see [configurating](#Config))
3. Rename `.env.example` to `.env`
4. Open a terminal and run `npm install`
5. Then run `npm run build`

_There will maybe be a Dockerfile in the future_

### Config

-   `DISCORD_TOKEN` - A token for a bot from https://discord.com/developers/applications
-   `CHANNEL_ID` - A channel id from the channel where to create the threads in
-   `GITLAB_ORG_NAME` - The name of your GitLab Org (without any `/` or spaces; can also be a personal username)
-   `PORT` _optional; default is `4000`_ - The port to run the bot on

### Starting the bot

We sugest using [`pm2`](https://pm2.keymetrics.io/) to start the bot.

1. Install `pm2` globally: `npm install -g pm2`
2. Go to the bot directory.
3. Run `pm2 start ecosystem.config.js`.

To stop the bot, simply go to the bot directory and run `pm2 stop ecosystem.config.js`.

### Configuring GitLab

1. Go to https://gitlab.com/
2. Go to your Group (or Project) -> Settings -> Integrations
3. Find `Discord Notifications` and click on it
4. Make sure `Enable integration` is checked
5. Check every trigger you want to receive notifications for
6. Fill out `Webhook` with `http://<your_domain>:<your_port>/incoming` (refer to the [configuration](#Config) for the port)
7. Click `Save changes`
