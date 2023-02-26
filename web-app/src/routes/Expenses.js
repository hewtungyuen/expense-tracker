import ExpenseTotals from "../components/ExpenseTotals";
import { Stack } from "@mui/material";
import CategoryTotals from "../components/sections/CategoryTotals";
import ExpenseList from "../components/sections/ExpenseList";
export default function Expenses() {
  return (
    <Stack spacing={4}>
      <ExpenseTotals />
      <CategoryTotals />
      <ExpenseList />
    </Stack>
  );
}
