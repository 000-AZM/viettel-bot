// api/bot.js
import { Bot } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN);

// Example command
bot.command('start', ctx => ctx.reply('Hello! Your bot is now running on Vercel 🚀'));

// Example reply to any message
bot.on('message', ctx => ctx.reply(`You said: ${ctx.message.text}`));

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await bot.handleUpdate(req.body);
    } catch (err) {
      console.error(err);
    }
    return res.status(200).send('OK');
  }
  res.status(200).send('Bot is running...');
}
