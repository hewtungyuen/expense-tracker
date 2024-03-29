import ExpenseTotals from "../components/ExpenseTotals";
import { Grid, Stack } from "@mui/material";
import CategoryTotals from "../sections/CategoryTotals";
import ExpenseList from "../sections/ExpenseList";
import useFetch from "../hooks/useFetch";
import { useSearchParams, useParams } from "react-router-dom";
import { useState } from "react";
import MyContext from "../utils/reactContext";

export default function Expenses() {
  const [refresh, setRefresh] = useState(false);

  function reRender() {
    setRefresh(!refresh);
  }

  const [searchParams] = useSearchParams();
  const routeParams = useParams();
  const telegramId = routeParams.telegramId;
  const overseas = searchParams.get("overseas");
  let url;

  if (overseas === "true") {
    const tripName = searchParams.get("tripName");
    url = `expenses/tripTotal/${telegramId}/${tripName}`;
  } else {
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    url = `expenses/${telegramId}/${year}/${month}`;
  }

  const { data, loading } = useFetch(url, refresh);

  return (
    <>
      {loading ? (
        <>loading</>
      ) : (
        <MyContext.Provider value={{ reRender }}>
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
              <Grid item xs={12} sm={2}>
                <CategoryTotals props={data.categoryTotals} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <ExpenseList data={data.expensesList} />
              </Grid>
            </Grid>
          </Stack>
        </MyContext.Provider>
      )}
    </>
  );
}
