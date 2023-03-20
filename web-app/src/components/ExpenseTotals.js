import { Typography } from "@mui/material";

export default function ExpenseTotals({ totalSgd, totalOverseas }) {

  if (totalOverseas) {
    return (
      <Typography>
        SGD: ${totalSgd.toFixed(2)} | Overseas currency: ${totalOverseas.toFixed(2)}
      </Typography>
    );
  }
  return <Typography>SGD: ${totalSgd.toFixed(2)}</Typography>;
}
