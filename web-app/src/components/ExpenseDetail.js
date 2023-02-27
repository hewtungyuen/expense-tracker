import { Box, Card, Grid, Typography } from "@mui/material";

export default function ExpenseDetail({
  categoryLogo,
  description,
  amount,
  date,
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
          <div className="description, date and amount">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={"bold"}>{description}</Typography>
              <Typography>SGD {amount}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle2">{date}</Typography>
              <Typography variant="subtitle2">
                Overseas currency: $100{" "}
              </Typography>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
}
