const api = require("../axiosConfig");
const state = require("../states/stateEnum");
const { Markup } = require("telegraf");

const displayMonthTotal = async (ctx) => {
  const date = new Date();
  const monthString = date.toLocaleString("default", { month: "long" });
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const telegramId = ctx.message.chat.username;
  const monthTotal = await api
    .get(`/expenses/${telegramId}/${year}/${month}`)
    .then((res) => res.data.sgd);
  await api.patch(`/users/${telegramId}`, { currentState: state.START });
  ctx.reply(
    `Total expenses for ${monthString}: $${parseFloat(monthTotal).toFixed(2)}`,
    Markup.keyboard([["Add expense", "Delete expense"], ["Overseas mode"]])
      .oneTime()
      .resize()
  );
};

const switchToOverseasMode = async (ctx) => {
  const telegramId = ctx.message.chat.username;
  await api.patch(`/users/${telegramId}`, {
    currentState: state.ENTER_TRIP_NAME,
  });
  ctx.reply(
    "Switched to overseas mode. Enter trip name:",
    Markup.keyboard([["Cancel"]])
      .oneTime()
      .resize()
  );
};

module.exports = {
  displayMonthTotal,
  switchToOverseasMode,
};
