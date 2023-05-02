import { Box, Stack, Typography } from "@mui/material";
import ExpenseDetails from "../components/ExpenseDetails";
import { AddExpenseIcon } from "../utils/Icons";

export default function ExpenseList({ data }) {
  let items;

  if (!data) {
    items = [];
  } else {
    items = data.map((d) => <ExpenseDetails key={d._id} expenseDetails={d} />);
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
