import { Stack, Box, Card, Grid, Typography } from "@mui/material";

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

function ExpenseAmount({ amountOverseasCurrency, amountSgd }) {
  if (amountOverseasCurrency) {
    return (
      <Stack alignitems="flex-end">
        <Typography>$ {amountOverseasCurrency}</Typography>
        <Typography variant="subtitle2">= SGD {amountSgd}</Typography>
      </Stack>
    );
  }

  return <Typography>SGD {amountSgd}</Typography>;
}

export default function ExpenseDetails({
  categoryLogo,
  description,
  amountSgd,
  date,
  tripName,
  amountOverseasCurrency,
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
          {categoryLogo}
        </Grid>

        <Grid xs={10.5}>
          <Stack direction={"row"} justifyContent="space-between">
            <Stack>
              <Typography fontWeight={"bold"}>{description}</Typography>
              <DescriptionAndDate date={date} tripName={tripName} />
            </Stack>
            <ExpenseAmount amountOverseasCurrency={amountOverseasCurrency} amountSgd={amountSgd}/>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}
