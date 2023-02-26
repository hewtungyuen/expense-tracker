import { Stack, Typography } from "@mui/material";
import ExpenseDetail from "../ExpenseDetail";
import EditIcon from "@mui/icons-material/Edit";
import Fastfood from "@mui/icons-material/Fastfood";

export default function ExpenseList() {
  return (
    <Stack spacing={1}>
      <Typography variant="h6">Expenses</Typography>

      <ExpenseDetail
        categoryLogo={<Fastfood fontSize="large" />}
        editLogo={<EditIcon fontSize="small" />}
        description="mcdonalds ice cream"
        date="28 Feb 2023"
        amount="1.00"
      ></ExpenseDetail>

      <ExpenseDetail
        categoryLogo={<Fastfood fontSize="large" />}
        editLogo={<EditIcon fontSize="small" />}
        description="mcdonalds ice cream"
        date="28 Feb 2023"
        amount="1.00"
      ></ExpenseDetail>

    </Stack>
  );
}
