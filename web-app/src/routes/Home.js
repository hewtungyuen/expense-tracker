import { Stack, Typography } from "@mui/material";
import ExpenseCard from "../components/ExpenseCard";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function Home({ trips }) {
  const routeParams = useParams();
  const telegramId = routeParams.telegramId;
  var type;

  if (trips) {
    type = "totalGroupedByTrip";
  } else {
    type = "totalGroupedByMonth";
  }
  const { data, loading } = useFetch(`/expenses/${type}/${telegramId}`);
  var items;

  if (!data) {
    return "";
  }

  if (data.length === 0) {
    return <Typography>No expenses to display</Typography>;
  }

  if (trips) {
    items = data.map((d) => (
      <ExpenseCard
        key={d._id.tripName}
        description={d._id.tripName}
        totalAmount={parseFloat(d.totalAmount).toFixed(2)}
        overseas={true}
      />
    ));
  } else {
    items = data.map((d) => (
      <ExpenseCard
        key={`${d._id.month + " / " + d._id.year}`}
        description={d._id.month + " / " + d._id.year}
        totalAmount={parseFloat(d.totalAmount).toFixed(2)}
      />
    ));
  }
  return <Stack spacing={2}>{items}</Stack>;
}
