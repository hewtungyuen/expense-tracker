import { Stack } from "@mui/material";
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

  if (trips) {
    items = data.map((d) => (
      <ExpenseCard
        key={d._id.tripName}
        description={d._id.tripName}
        totalAmount={d.totalAmount}
        overseas={true}
      />
    ));
  } else {
    items = data.map((d) => (
      <ExpenseCard
        key={`${d._id.month + " / " + d._id.year}`}
        description={d._id.month + " / " + d._id.year}
        totalAmount={d.totalAmount}
      />
    ));
  }
  return <Stack spacing={2}>{items}</Stack>;
}
