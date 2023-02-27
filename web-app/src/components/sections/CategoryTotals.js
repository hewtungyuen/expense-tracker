import CategoryTotal from "../CategoryTotal";
import { Stack, Typography, Grid } from "@mui/material";
import { FoodIcon, LeisureIcon, ShoppingIcon, TransportIcon } from "../Icons";

export default function CategoryTotals() {
  return (
    <Stack spacing={1} >
      <Typography variant="h6" fontWeight={"bold"}>
        Categories
      </Typography>

      <Grid container>
        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={
              <FoodIcon />
            }
            category={"Food"}
            amount={100}
          />
        </Grid>
        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<LeisureIcon />}
            category={"Leisure"}
            amount={100}
          />
        </Grid>

        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<ShoppingIcon />}
            category={"Shopping"}
            amount={100}
          />
        </Grid>

        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<TransportIcon />}
            category={"Transport"}
            amount={100}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
