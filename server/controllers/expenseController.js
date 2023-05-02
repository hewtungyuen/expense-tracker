const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

const addExpense = (req, res) => {
  Expense.create(req.body).then((expense) => res.json(expense));
};

const deleteExpenseById = (req, res) => {
  Expense.findByIdAndRemove(req.params.id).then(() =>
    res.json({
      success: true,
      id: req.params.id,
    })
  );
};

const getLatestExpenseId = (req, res) => {
  Expense.find({})
    .sort({
      date: -1,
    })
    .limit(1)
    .then((latestExpense) => res.json(latestExpense[0]));
};

const getMonthTotalSgd = async (req, res) => {
  const id = req.params.id;
  const month = req.params.month;
  const year = req.params.year;

  const monthExpenses = await Expense.find({
    telegramId: id,
    tripName: { $exists: false },
    $expr: {
      $and: [
        {
          $eq: [
            {
              $month: "$date",
            },
            month,
          ],
        },
        {
          $eq: [
            {
              $year: "$date",
            },
            year,
          ],
        },
      ],
    },
  }).sort({ date: -1 });

  var total = 0;
  var categoryTotals = {
    foodAmount: 0,
    leisureAmount: 0,
    shoppingAmount: 0,
    transportAmount: 0,
  };

  monthExpenses.forEach((item, index) => {
    const expenseAmount = item.expenseAmountSgd;
    total += expenseAmount;
    const category = item.expenseCategory;
    switch (category) {
      case "Food":
        categoryTotals.foodAmount += expenseAmount;
        break;

      case "Transport":
        categoryTotals.transportAmount += expenseAmount;
        break;

      case "Leisure":
        categoryTotals.leisureAmount += expenseAmount;
        break;

      case "Shopping":
        categoryTotals.shoppingAmount += expenseAmount;
        break;
    }
  });
  res.json({
    sgd: total,
    expensesList: monthExpenses,
    categoryTotals: categoryTotals,
  });
};

const getTripTotal = async (req, res) => {
  const tripExpenses = await Expense.find({
    telegramId: req.params.id,
    tripName: req.params.tripName,
  }).sort({ date: -1 });

  var amountInSgd = 0;
  var amountInOverseasCurrency = 0;
  var total = 0;
  var categoryTotals = {
    foodAmount: 0,
    leisureAmount: 0,
    shoppingAmount: 0,
    transportAmount: 0,
  };

  tripExpenses.forEach((item, index) => {
    const amountOverseas = item.expenseAmountOverseas;
    const amountSgd = item.expenseAmountSgd;

    total += amountSgd;
    if (amountOverseas) {
      amountInOverseasCurrency += amountOverseas;
    } else {
      amountInSgd += amountSgd;
    }

    const category = item.expenseCategory;
    switch (category) {
      case "Food":
        categoryTotals.foodAmount += amountSgd;
        break;
      case "Transport":
        categoryTotals.transportAmount += amountSgd;
        break;
      case "Leisure":
        categoryTotals.leisureAmount += amountSgd;
        break;
      case "Shopping":
        categoryTotals.shoppingAmount += amountSgd;
        break;
    }
  });

  res.json({
    sgd: amountInSgd,
    overseasCurrency: amountInOverseasCurrency,
    total: total,
    expensesList: tripExpenses,
    categoryTotals: categoryTotals,
  });
};

const totalGroupedByMonth = (req, res) => {
  const id = req.params.id;
  Expense.aggregate([
    {
      $match: {
        telegramId: id,
        tripName: { $exists: false },
      },
    },
    {
      $group: {
        _id: { year: { $year: "$date" }, month: { $month: "$date" } },
        totalAmount: { $sum: "$expenseAmountSgd" },
        date: { $min: "$date" },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ]).then((output) => res.json(output));
};

const totalGroupedByTrip = async (req, res) => {
  const id = req.params.id;
  Expense.aggregate([
    {
      $match: {
        telegramId: id,
        tripName: { $exists: true },
      },
    },
    {
      $group: {
        _id: { tripName: "$tripName" },
        totalAmount: { $sum: "$expenseAmountSgd" },
        date: { $min: "$date" },
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
  ]).then((output) => res.json(output));
};

const getYesterdayTotal = async (req, res) => {
  const currentDate = new Date();

  const id = req.params.id;
  const yesterdayExpenses = await Expense.find({
    telegramId: id,
    date: {
      $gte: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        new Date().getDate() - 1
      ),
      $lt: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        new Date().getDate()
      ),
    },
  });

  res.json(yesterdayExpenses);
};

const filterExpenses = async (req, res) => {
  const filteredExpenses = await Expense.find(req.body);
  res.json(filteredExpenses);
};

const getTripExpenses = async (req, res) => {
  const filters = {
    telegramId: req.params.id,
    tripName: req.params.tripName,
  };
  const result = await Expense.find(filters).sort({ date: -1 });
  res.json(result);
};

const updateExpense = async (req, res) => {
  const result = await Expense.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  });
  res.json(result);
};

module.exports = {
  addExpense,
  deleteExpenseById,
  getLatestExpenseId,
  getMonthTotalSgd,
  getTripTotal,
  getYesterdayTotal,
  filterExpenses,
  totalGroupedByMonth,
  totalGroupedByTrip,
  getTripExpenses,
  updateExpense,
};
