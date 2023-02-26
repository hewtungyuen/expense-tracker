import { Stack } from "@mui/material";
import ExpenseCard from "../components/ExpenseCard";

export default function Home() {
  return (
    <Stack spacing={2}>
      <ExpenseCard description={"Feb 2023"} totalAmount={100} />
      <ExpenseCard description={"Jan 2023"} totalAmount={100} />
      <ExpenseCard description={"Dec 2022"} totalAmount={100} />
    </Stack>
  );
}
