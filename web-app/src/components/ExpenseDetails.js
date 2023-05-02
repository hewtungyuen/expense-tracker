import { Stack, Card, Grid, Typography } from "@mui/material";
import {
  FoodIcon,
  LeisureIcon,
  ShoppingIcon,
  TransportIcon,
} from "../utils/Icons";
import React from "react";
import ExpenseDialog from "./ExpenseDialog";

function DescriptionAndDate({ date, tripName }) {
  if (tripName) {
    return <Typography variant="subtitle2">{date}</Typography>;
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

export default function ExpenseDetails({ expenseDetails }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Card onClick={handleClickOpen}>
        <Grid
          container
          sx={{
            padding: 2,
          }}
          justifyContent="space-between"
        >
          <Grid
            item
            xs={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CategoryIconSelector
              expenseCategory={expenseDetails.expenseCategory}
            />
          </Grid>

          <Grid item xs={10.5}>
            <Stack direction={"row"} justifyContent="space-between">
              <Stack>
                <Typography fontWeight={"bold"}>
                  {expenseDetails.expenseDescription}
                </Typography>
                <DescriptionAndDate
                  date={
                    new Date(expenseDetails.date).toISOString().split("T")[0]
                  }
                  tripName={expenseDetails.tripName}
                />
              </Stack>
              <ExpenseAmount
                expenseAmountOverseas={expenseDetails.expenseAmountOverseas}
                expenseAmountSgd={expenseDetails.expenseAmountSgd}
              />
            </Stack>
          </Grid>
        </Grid>
      </Card>
      <ExpenseDialog
        open={open}
        closeDialog={closeDialog}
        expenseDetails={expenseDetails}
      />
    </>
  );
}
