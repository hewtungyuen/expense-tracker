import ExpenseTotals from "../components/ExpenseTotals";
import { Grid, Stack } from "@mui/material";
import CategoryTotals from "../components/sections/CategoryTotals";
import ExpenseList from "../components/sections/ExpenseList";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

export default function Expenses() {
  const [searchParams] = useSearchParams();
  const overseas = true;
  const telegramId = "tungyuen";
  let dataUrl;
  let totalsUrl;

  if (overseas) {
    const tripName = searchParams.get("tripName");

    dataUrl = `expenses/tripExpenses/${telegramId}/${tripName}`;
    totalsUrl = `expenses/tripTotal/${telegramId}/${tripName}`;
  } else {
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    dataUrl = `${telegramId}/${year}/${month}`;
    totalsUrl = `${telegramId}/${year}/${month}`;
  }

  const data = useFetch(dataUrl);
  const totals = useFetch(totalsUrl);

  if (!totals) {
    return "loading";
  }
  return (
    <Stack spacing={4}>
      <ExpenseTotals
        totalOverseas={totals.overseasCurrency.toFixed(2)}
        totalSgd={totals.sgd.toFixed(2)}
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
          <ExpenseList data={data} />
        </Grid>
      </Grid>
    </Stack>
  );
}
