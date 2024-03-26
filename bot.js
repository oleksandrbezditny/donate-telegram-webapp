import { Telegraf, Markup } from 'telegraf';

const token = '6852025342:AAEE2KUjCfuVqRNqwOPL9LeaTj19oDWvjc4';
const webAppUrl = 'https://oleksandrbezditny.github.io/donate-telegram-webapp/';

const bot = new Telegraf(token);

bot.command('start', (ctx) => {
  ctx.reply(
    'Hello, to start application, please, press button below',
    Markup.keyboard([Markup.button.webApp('Send message', webAppUrl)])
  );
});

bot.launch();
