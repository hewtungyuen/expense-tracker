import { Box, Stack, Typography } from "@mui/material";
import ExpenseDetails from "../ExpenseDetails";
import { FoodIcon, LeisureIcon, AddExpenseIcon, ShoppingIcon, TransportIcon } from "../Icons";

export default function ExpenseList() {
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
        <AddExpenseIcon fontSize="large" />
      </Box>

      <ExpenseDetails
        categoryLogo={<FoodIcon fontSize="large" />}
        description="Mcdonalds ice cream"
        date="28 Feb 2023"
        amountSgd="1.00"
      ></ExpenseDetails>

      <ExpenseDetails
        categoryLogo={<LeisureIcon fontSize="large" />}
        description="B8a climb"
        date="28 Feb 2023"
        amountSgd="1.00"
      ></ExpenseDetails>
      <ExpenseDetails
        categoryLogo={<ShoppingIcon fontSize="large" />}
        description="Air force 1"
        date="28 Feb 2023"
        amountSgd="1.00"
        amountOverseasCurrency="650000"
        tripName="Vietnam"
      ></ExpenseDetails>
    </Stack>
  );
}
