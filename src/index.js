import { App } from '@slack/bolt';
import dotenv from 'dotenv';
dotenv.config();

const app = new App({
  token: process.env.SLACK_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');

  app.event('emoji_changed', async ({ event, client }) => {
    if (event.subtype === 'add') {
      const { name } = event;
      await client.chat.postMessage({
        channel: process.env.CHANNEL_ID,
        text: `🎉 A new emoji has been added! :${name}: \`:${name}:\``,
      });
    }
  });
})();
