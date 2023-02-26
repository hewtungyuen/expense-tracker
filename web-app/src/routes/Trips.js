import { Stack } from "@mui/material";
import ExpenseCard from "../components/ExpenseCard";

export default function Trips() {
  return (
    <Stack spacing={2}>
      <ExpenseCard description={"Vietnam"} totalAmount={100} />
      <ExpenseCard description={"Taiwan"} totalAmount={100} />
      <ExpenseCard description={"Korea"} totalAmount={100} />
    </Stack>
  );
}
