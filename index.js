const TelegramBot = require('node-telegram-bot-api');

const token = '7831994077:AAEU_PD617krowEfUw_OAEEyL0neuUZADvs';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}!`);
});
