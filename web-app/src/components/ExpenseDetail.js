import { Box, Grid, Typography } from "@mui/material";

export default function ExpenseDetail({
  categoryLogo,
  editLogo,
  description,
  amount,
  date,
}) {
  return (
    <>
      <Grid
        container
        sx={{
          bgcolor: "white",
          padding:2,
        }}
      >
        <Grid xs={1.5} display="flex" justifyContent="center" alignItems="center">{categoryLogo}</Grid>
        <Grid xs={9} >
          <div className="description, date and amount">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={'bold'}>{description}</Typography>
              <Typography >SGD {amount}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="subtitle2">{date}</Typography>
              <Typography variant="subtitle2">Overseas currency: $100 </Typography>
            </Box>
          </div>
        </Grid>
        <Grid xs={1.5} display="flex" justifyContent="center" alignItems="center">{editLogo}</Grid>
      </Grid>
    </>
  );
}
