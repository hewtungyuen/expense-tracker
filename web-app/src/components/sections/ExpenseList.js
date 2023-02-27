import { Box, Stack, Typography } from "@mui/material";
import ExpenseDetail from "../ExpenseDetail";
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

      <ExpenseDetail
        categoryLogo={<FoodIcon fontSize="large" />}
        description="Mcdonalds ice cream"
        date="28 Feb 2023"
        amount="1.00"
      ></ExpenseDetail>

      <ExpenseDetail
        categoryLogo={<LeisureIcon fontSize="large" />}
        description="B8a climb"
        date="28 Feb 2023"
        amount="1.00"
      ></ExpenseDetail>
    </Stack>
  );
}
