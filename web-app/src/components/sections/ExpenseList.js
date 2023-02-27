import { Box, Stack, Typography } from "@mui/material";
import ExpenseDetails from "../ExpenseDetails";
import {
  AddExpenseIcon,
} from "../utils/Icons";

const data = [
  {
    date: "23 Feb 2023",
    expenseDescription: "Mcdonalds ice cream",
    expenseCategory: "Food",
    expenseAmountSgd: "1.00",
  },
  {
    date: "23 Feb 2023",
    expenseDescription: "Shirt",
    expenseCategory: "Shopping",
    expenseAmountSgd: "58.85",
    tripName: "Vietnam",
  },
  {
    date: "23 Feb 2023",
    expenseDescription: "B8a climb",
    expenseCategory: "Leisure",
    expenseAmountSgd: "15.00",
  },
  {
    date: "23 Feb 2023",
    expenseDescription: "Sneakers",
    expenseCategory: "Shopping",
    expenseAmountSgd: "58.85",
    expenseAmountOverseas: "100000",
    tripName: "Vietnam",
  },
  {
    date: "23 Feb 2023",
    expenseDescription: "Sneakers",
    expenseCategory: "Shopping",
    expenseAmountSgd: "58.85",
    expenseAmountOverseas: "100000",
    tripName: "Vietnam",
  },

  {
    date: "23 Feb 2023",
    expenseDescription: "Grab",
    expenseCategory: "Transport",
    expenseAmountSgd: "10.00",
    tripName: "Vietnam",
  },
];

export default function ExpenseList() {
  const items = data.map((d) => (
    <ExpenseDetails
      expenseCategory={d.expenseCategory}
      expenseDescription={d.expenseDescription}
      date={d.date}
      expenseAmountSgd={d.expenseAmountSgd}
      expenseAmountOverseas={d.expenseAmountOverseas}
      tripName={d.tripName}
    />
  ));
  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          Expenses
        </Typography>
        <AddExpenseIcon fontSize="large" />
      </Box>
      {items}
    </Stack>
  );
}
