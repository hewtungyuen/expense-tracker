import ExpenseTotals from "../components/ExpenseTotals";
import { Grid, Stack } from "@mui/material";
import CategoryTotals from "../components/sections/CategoryTotals";
import ExpenseList from "../components/sections/ExpenseList";
export default function Expenses() {
  return (
    <Stack spacing={4} >
      <ExpenseTotals />
      <Grid container direction={{sm:'row-reverse'}} justifyContent='space-between'>
        <Grid xs={12} sm={3} >
          <CategoryTotals />
        </Grid>
        <Grid xs={12} sm={8} >
          <ExpenseList />
        </Grid>
      </Grid>
    </Stack>
  );
}
