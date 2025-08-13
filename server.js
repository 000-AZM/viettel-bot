const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID; // Your own Telegram user ID for testing

// Telegram bot in polling mode
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const bot = new TelegramBot(process.env.BOT_TOKEN, { webHook: true });
bot.setWebHook(`${process.env.VERCEL_URL}/api/bot`);

const app = express();
app.use(express.json());

// Webhook endpoint
app.post("/api/bot", (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Bot commands
bot.on("message", (msg) => {
  bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
});

module.exports = app;
