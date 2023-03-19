import { Stack, Card, Grid, Typography } from "@mui/material";
import {
  FoodIcon,
  LeisureIcon,
  ShoppingIcon,
  TransportIcon,
} from "./utils/Icons";

function DescriptionAndDate({ date, tripName }) {
  if (tripName) {
    return (
      <Typography variant="subtitle2">
        {date} | {tripName}
      </Typography>
    );
  }
  return <Typography variant="subtitle2">{date}</Typography>;
}

function ExpenseAmount({ expenseAmountOverseas, expenseAmountSgd }) {
  if (expenseAmountOverseas) {
    return (
      <Stack alignitems="flex-end">
        <Typography>$ {expenseAmountOverseas}</Typography>
        <Typography variant="subtitle2">= SGD {expenseAmountSgd}</Typography>
      </Stack>
    );
  }

  return <Typography>SGD {expenseAmountSgd}</Typography>;
}

function CategoryIconSelector({ expenseCategory }) {
  switch (expenseCategory) {
    case "Shopping":
      return <ShoppingIcon />;
    case "Leisure":
      return <LeisureIcon />;
    case "Food":
      return <FoodIcon />;
    case "Transport":
      return <TransportIcon />;
    default:
      return <>{expenseCategory}</>;
  }
}

export default function ExpenseDetails({
  expenseCategory,
  expenseDescription,
  expenseAmountSgd,
  date,
  tripName,
  expenseAmountOverseas,
}) {
  return (
    <Card
      sx={{
        bgcolor: "#aec3b0",
      }}
    >
      <Grid
        container
        sx={{
          padding: 2,
        }}
        justifyContent="space-between"
      >
        <Grid xs={1} display="flex" justifyContent="center" alignItems="center">
          <CategoryIconSelector expenseCategory={expenseCategory} />
        </Grid>

        <Grid xs={10.5}>
          <Stack direction={"row"} justifyContent="space-between">
            <Stack>
              <Typography fontWeight={"bold"}>{expenseDescription}</Typography>
              <DescriptionAndDate date={date} tripName={tripName} />
            </Stack>
            <ExpenseAmount
              expenseAmountOverseas={expenseAmountOverseas}
              expenseAmountSgd={expenseAmountSgd}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
