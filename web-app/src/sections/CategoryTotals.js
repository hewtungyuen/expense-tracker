import CategoryTotal from "../components/CategoryTotal";
import { Stack, Typography, Grid } from "@mui/material";
import {
  FoodIcon,
  LeisureIcon,
  OthersIcon,
  ShoppingIcon,
  TransportIcon,
} from "../utils/Icons";

export default function CategoryTotals({ props }) {
  const foodAmount = props.foodAmount.toFixed(2);
  const leisureAmount = props.leisureAmount.toFixed(2);
  const shoppingAmount = props.shoppingAmount.toFixed(2);
  const transportAmount = props.transportAmount.toFixed(2);
  const othersAmount = props.othersAmount.toFixed(2);

  return (
    <Stack spacing={1}>
      <Typography variant="h6" fontWeight={"bold"}>
        Categories
      </Typography>

      <Grid container>
        <Grid item xs={6} sm={12}>
          <CategoryTotal
            logo={<FoodIcon />}
            category={"Food"}
            amount={foodAmount}
          />
        </Grid>
        <Grid item xs={6} sm={12}>
          <CategoryTotal
            logo={<LeisureIcon />}
            category={"Leisure"}
            amount={leisureAmount}
          />
        </Grid>

        <Grid item xs={6} sm={12}>
          <CategoryTotal
            logo={<ShoppingIcon />}
            category={"Shopping"}
            amount={shoppingAmount}
          />
        </Grid>

        <Grid item xs={6} sm={12}>
          <CategoryTotal
            logo={<TransportIcon />}
            category={"Transport"}
            amount={transportAmount}
          />
        </Grid>
        <Grid item xs={6} sm={12}>
          <CategoryTotal
            logo={<OthersIcon />}
            category={"Others"}
            amount={othersAmount}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
