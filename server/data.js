const { faker } = require("@faker-js/faker");
const Expense = require("./models/expenseModel");
const axios = require("axios");

const ids = ["tungyuen"];
const categories = ["Food", "Leisure", "Transport", "Shopping"];

const trips = [
  ["Vietnam", 17100],
  ["Malaysia", 3],
];

const create = () => {
  const overseasTransaction = faker.helpers.arrayElement([true, false]);
  const telegramId = faker.helpers.arrayElement(ids);
  const expenseCategory = faker.helpers.arrayElement(categories);
  const date = faker.date.past(3);

  const output = {
    telegramId: telegramId,
    date: date,
    expenseDescription: "Expense description",
    expenseCategory: expenseCategory,
    expenseAmountSgd: faker.finance.amount(1, 100),
  };

  if (overseasTransaction) {
    const overseasCurrency = faker.helpers.arrayElement([true, false]);

    const [tripName, exchangeRate] = faker.helpers.arrayElement(trips);
    output.tripName = tripName;
    if (overseasCurrency) {
      if (tripName == "Vietnam") {
        output.expenseAmountOverseas = faker.finance.amount(10000, 1000000);
        output.date = faker.date.between(
          "2021-01-01T00:00:00.000Z",
          "2022-01-01T00:00:00.000Z"
        );
      } else if (tripName == "Malaysia") {
        output.expenseAmountOverseas = faker.finance.amount(3, 300);
        output.date = faker.date.between(
          "2022-01-01T00:00:00.000Z",
          "2023-01-01T00:00:00.000Z"
        );
      }
      output.expenseAmountSgd = (
        output.expenseAmountOverseas / exchangeRate
      ).toFixed(2);
      output.exchangeRate = exchangeRate;
    }
  }
  console.log(output);
  return output;
};

const generateData = async (n) => {
  while (n >= 0) {
    const data = create();
    await axios.post("http://localhost:5000/expenses", data);
    n--;
  }
};

// create()
// generateData(1000)
