import CategoryTotal from "../CategoryTotal";
import { Stack, Typography, Grid } from "@mui/material";
import {
  FoodIcon,
  LeisureIcon,
  ShoppingIcon,
  TransportIcon,
} from "../utils/Icons";

const foodAmount = "100";
const leisureAmount = "100";
const shoppingAmount = "100";
const transportAmount = "100";

export default function CategoryTotals() {
  return (
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={"bold"}>
        Categories
      </Typography>

      <Grid container>
        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<FoodIcon />}
            category={"Food"}
            amount={foodAmount}
          />
        </Grid>
        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<LeisureIcon />}
            category={"Leisure"}
            amount={leisureAmount}
          />
        </Grid>

        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<ShoppingIcon />}
            category={"Shopping"}
            amount={shoppingAmount}
          />
        </Grid>

        <Grid xs={6} sm={12}>
          <CategoryTotal
            logo={<TransportIcon />}
            category={"Transport"}
            amount={transportAmount}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
