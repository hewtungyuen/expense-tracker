import { Stack } from "@mui/material";
import ExpenseCard from "../components/ExpenseCard";

const local = [
  {
    month: "Feb 2023",
    total: "100",
  },
  {
    month: "Jan 2023",
    total: "100",
  },
  {
    month: "Dec 2023",
    total: "100",
  },
];

const overseas = [
  {
    month: "Vietnam 2023",
    total: "100",
  },
  {
    month: "Taiwan 2022",
    total: "100",
  },
  {
    month: "Korea 2022",
    total: "100",
  },
];
export default function Home({ trips }) {
  var items;
  if (trips) {
    items = overseas.map((d) => (
      <ExpenseCard description={d.month} totalAmount={d.total} />
    ));
  } else {
    items = local.map((d) => (
      <ExpenseCard description={d.month} totalAmount={d.total} />
    ));
  }
  return <Stack spacing={2}>{items}</Stack>;
}
