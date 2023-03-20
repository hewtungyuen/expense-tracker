import ExpenseTotals from "../components/ExpenseTotals";
import { Grid, Stack } from "@mui/material";
import CategoryTotals from "../components/sections/CategoryTotals";
import ExpenseList from "../components/sections/ExpenseList";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

export default function Expenses() {
  const [searchParams] = useSearchParams();
  const overseas = searchParams.get("overseas");
  const telegramId = "tungyuen";
  let url;

  if (overseas === "true") {
    const tripName = searchParams.get("tripName");
    url = `expenses/tripTotal/${telegramId}/${tripName}`;
  } else {
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    url = `expenses/${telegramId}/${year}/${month}`;
  }

  const data = useFetch(url);

  if (!data) {
    return "loading";
  }
  return (
    <Stack spacing={4}>
      <ExpenseTotals
        totalOverseas={data.overseasCurrency}
        totalSgd={data.sgd}
      />
      <Grid
        container
        direction={{ sm: "row-reverse" }}
        justifyContent="space-between"
      >
        <Grid xs={12} sm={3}>
          <CategoryTotals />
        </Grid>
        <Grid xs={12} sm={8}>
          <ExpenseList data={data.expensesList} />
        </Grid>
      </Grid>
    </Stack>
  );
}
