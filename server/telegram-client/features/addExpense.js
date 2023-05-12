const { Markup } = require("telegraf");
const api = require("../axiosConfig");
const state = require("../states/stateEnum");
const { saveExpenseToDatabase } = require("./saveExpense");

const addNewExpense = async (ctx) => {
  const telegramId = ctx.message.chat.username;
  const inOverseasMode = await api
    .get(`/users/${telegramId}/overseasMode`)
    .then((val) => val.data);
  if (inOverseasMode) {
    await api.patch(`/users/${telegramId}`, {
      currentState: state.ADD_EXPENSE_OVERSEAS,
    });
    ctx.reply(
      "What currency do you want to use?",
      Markup.keyboard([["SGD", "Overseas currency"], ["Cancel"]])
        .oneTime()
        .resize()
    );
  } else {
    await api.patch(`/users/${telegramId}`, {
      currentState: state.ENTER_AMOUNT_SGD,
    });
    ctx.reply(
      "Enter amount: ",
      Markup.keyboard([["Cancel"]])
        .oneTime()
        .resize()
    );
  }
};

const addNewExpenseOverseasMode = async (ctx) => {
  const userInput = ctx.message.text;
  const telegramId = ctx.message.chat.username;

  if (userInput == "Overseas currency") {
    await api.patch(`/users/${telegramId}`, {
      currentState: state.ENTER_AMOUNT_OVERSEAS,
    });
  } else {
    await api.patch(`/users/${telegramId}`, {
      currentState: state.ENTER_AMOUNT_SGD,
    });
  }
  ctx.reply(
    "Enter amount: ",
    Markup.keyboard([["Cancel"]])
      .oneTime()
      .resize()
  );
};

const enterAmount = async (ctx) => {
  const telegramId = ctx.message.chat.username;
  const currentState = await api
    .get(`/users/${telegramId}/currentState`)
    .then((value) => value.data);
  const amount = parseFloat(ctx.message.text);

  if (currentState == state.ENTER_AMOUNT_SGD) {
    await api.patch(`/users/${telegramId}`, { expenseAmountSgd: amount });
    await api.patch(`/users/${telegramId}`, { expenseAmountOverseas: 0 });
  } else if (currentState == state.ENTER_AMOUNT_OVERSEAS) {
    await api.patch(`/users/${telegramId}`, { expenseAmountOverseas: amount });
    await api.patch(`/users/${telegramId}`, { expenseAmountSgd: 0 });
  }

  await api.patch(`/users/${telegramId}`, {
    currentState: state.ENTER_DESCRIPTION,
  });

  ctx.reply(
    "Enter description: ",
    Markup.keyboard([["Cancel"]])
      .oneTime()
      .resize()
  );
};

const enterAmountOverseas = async (ctx) => {
  const telegramId = ctx.message.chat.username;
  const amount = ctx.message.text;
  await api.patch(`/users/${telegramId}`, { expenseAmountOverseas: amount });
  await api.patch(`/users/${telegramId}`, {
    currentState: state.ENTER_DESCRIPTION,
  });
  ctx.reply(
    "Enter description: ",
    Markup.keyboard([["Cancel"]])
      .oneTime()
      .resize()
  );
};

const enterDescription = async (ctx) => {
  const telegramId = ctx.message.chat.username;
  const description = ctx.message.text;
  await api.patch(`/users/${telegramId}`, { expenseDescription: description });
  await api.patch(`/users/${telegramId}`, {
    currentState: state.ENTER_CATEGORY,
  });
  ctx.reply(
    "Choose category: ",
    Markup.keyboard([
      ["Food", "Leisure"],
      ["Shopping", "Transport"],
      ["Others", "Cancel"],
    ])
      .oneTime()
      .resize()
  );
};

const enterCategory = async (ctx) => {
  const telegramId = ctx.message.chat.username;
  const category = ctx.message.text;
  await api.patch(`/users/${telegramId}`, { expenseCategory: category });
  await saveExpenseToDatabase(ctx);
};

module.exports = {
  addNewExpense,
  enterAmount,
  enterDescription,
  enterCategory,
  addNewExpenseOverseasMode,
  enterAmountOverseas,
};
