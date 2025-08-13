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
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Serve static HTML page
app.use(express.static("public"));

// Browser sends a message → Telegram bot sends it
io.on("connection", (socket) => {
  socket.on("sendMessage", (msg) => {
    bot.sendMessage(CHAT_ID, msg);
  });
});

// Telegram → Browser
bot.on("message", (msg) => {
  io.emit("newMessage", { from: msg.from.first_name, text: msg.text });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
