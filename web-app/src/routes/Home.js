import { Stack } from "@mui/material";
import ExpenseCard from "../components/ExpenseCard";
import useFetch from "../hooks/useFetch";

export default function Home({ trips }) {
  var type;

  if (trips) {
    type = "totalGroupedByTrip";
  } else {
    type = "totalGroupedByMonth";
  }
  const data = useFetch(`/expenses/${type}/tungyuen`);
  var items;

  if (!data) {
    return "";
  }

  if (trips) {
    items = data.map((d) => (
      <ExpenseCard
        key={d.totalAmount}
        description={d._id.tripName}
        totalAmount={d.totalAmount}
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
