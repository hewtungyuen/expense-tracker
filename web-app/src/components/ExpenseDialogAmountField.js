import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import React from "react";

export default function ExpenseDialogAmountField({
  expenseDetails,
  handleInputChange,
  setFormData,
}) {
  const [selectedValue, setSelectedValue] = React.useState("expenseAmountSgd");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      expenseType: event.target.value,
    }));
  };

  if (typeof expenseDetails.tripName != "undefined") {
    return (
      <>
        <FormLabel>Currency</FormLabel>
        <RadioGroup value={selectedValue} onChange={handleChange}>
          <FormControlLabel
            value="expenseAmountSgd"
            control={<Radio />}
            label="SGD"
          />
          <FormControlLabel
            value="expenseAmountOverseas"
            control={<Radio />}
            label="Overseas"
          />
        </RadioGroup>
        <TextField
          label="Expense amount"
          name={selectedValue}
          fullWidth
          onChange={handleInputChange}
          inputProps={{ inputMode: "numeric" }}
        />
      </>
    );
  } else {
    return (
      <TextField
        label="Amount (SGD)"
        name="expenseAmountSgd"
        fullWidth
        defaultValue={expenseDetails.expenseAmountSgd}
        onChange={handleInputChange}
        inputProps={{ inputMode: "numeric" }}
      />
    );
  }
}
