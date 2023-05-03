import { Box, Button, Stack, Typography } from "@mui/material";
import ExpenseDetails from "../components/ExpenseDetails";
import { AddExpenseIcon } from "../utils/Icons";
import { useState } from "react";
import AddExpenseDialog from "../components/AddExpenseDialog";
import { useSearchParams } from "react-router-dom";
export default function ExpenseList({ data }) {
  const [searchParams] = useSearchParams();

  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };
  let items;

  if (!data) {
    items = [];
  } else {
    items = data.map((d) => <ExpenseDetails key={d._id} expenseDetails={d} />);
  }

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          Expenses
        </Typography>
        <Button onClick={openDialog}>
          <AddExpenseIcon fontSize="large" />
        </Button>
        <AddExpenseDialog
          open={open}
          closeDialog={closeDialog}
          overseas={searchParams.get("overseas")}
        />
      </Box>
      {items}
    </Stack>
  );
}
