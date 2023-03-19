import { Box, Stack, Typography } from "@mui/material";
import ExpenseDetails from "../ExpenseDetails";
import { AddExpenseIcon } from "../utils/Icons";

export default function ExpenseList({ data }) {
  let items;

  if (!data) {
    items = [];
  } else {
    items = data.map((d) => (
      <ExpenseDetails
        key={d._id}
        expenseCategory={d.expenseCategory}
        expenseDescription={d.expenseDescription}
        date={new Date(d.date).toISOString().split("T")[0]}
        expenseAmountSgd={d.expenseAmountSgd}
        expenseAmountOverseas={d.expenseAmountOverseas}
        tripName={d.tripName}
      />
    ));
  }

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
