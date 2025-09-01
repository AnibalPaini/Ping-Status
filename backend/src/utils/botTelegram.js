import { Telegraf } from "telegraf";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config/config.js";

export const conectarBotTelegram = () => {
  if (!config.TOKEN_TELEGRAM) {
    console.warn("Falta TOKEN_TELEGRAM en el archivo .env. El bot de Telegram no se conectará.");
    return;
  }

  let bot;
  try {
    bot = new Telegraf(config.TOKEN_TELEGRAM);
  } catch (err) {
    console.error("Error al crear el bot de Telegram:", err);
    return;
  }

  console.log("Conectando al bot de Telegram...");
  bot.on("message", (ctx) => {
    console.log(ctx.message.chat);
  });

  bot.start((ctx) => ctx.reply("¡Hola! Soy tu bot de Telegram."));

  // Enviar mensaje de bienvenida solo si el chat ID parece válido
  if (config.GROUP_CHAT_ID && /^[\-\d]+$/.test(config.GROUP_CHAT_ID)) {
    bot.telegram.sendMessage(config.GROUP_CHAT_ID, "¡Hola! Soy tu bot de Telegram.")
      .catch((err) => {
        console.error("Error al enviar mensaje de bienvenida a Telegram:", err);
      });
  } else {
    console.warn("Falta GROUP_CHAT_ID válido en el archivo .env. No se enviará mensaje de bienvenida.");
  }

  bot
    .launch()
    .then(() => {
      console.log("Bot de Telegram conectado");
    })
    .catch((err) => {
      console.error("Error al conectar el bot de Telegram:", err);
    });
};

export const sendTelegramMessage = async (message) => {
  if (!config.TOKEN_TELEGRAM || !config.GROUP_CHAT_ID || !/^[\-\d]+$/.test(config.GROUP_CHAT_ID)) {
    console.warn("Falta TOKEN_TELEGRAM o GROUP_CHAT_ID válido en el archivo .env. No se enviará mensaje a Telegram.");
    return;
  }

  let bot;
  try {
    bot = new Telegraf(config.TOKEN_TELEGRAM);
  } catch (err) {
    console.error("Error al crear el bot de Telegram:", err);
    return;
  }

  try {
    await bot.telegram.sendMessage(config.GROUP_CHAT_ID, message);
    console.log("Mensaje enviado al grupo de Telegram");
  } catch (error) {
    console.error("Error al enviar mensaje a Telegram:", error);
  }
}
