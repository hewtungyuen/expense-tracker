import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import dayjs from "dayjs";
import api from "../axiosConfig";

export default function ExpenseDialog({ open, closeDialog, expenseDetails }) {
  const [formData, setFormData] = React.useState({
    expenseCategory: expenseDetails.expenseCategory,
    expenseDescription: expenseDetails.expenseDescription,
    date: expenseDetails.date,
    tripName: expenseDetails.tripName,
    expenseAmountOverseas: expenseDetails.expenseAmountOverseas,
    expenseAmountSgd: expenseDetails.expenseAmountSgd,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleClose = async () => {
    closeDialog();
    console.log('here')
    await api.post(`expenses/${expenseDetails.id}`, formData);
    setFormData({
      expenseCategory: expenseDetails.expenseCategory,
      expenseDescription: expenseDetails.expenseDescription,
      date: expenseDetails.date,
      tripName: expenseDetails.tripName,
      expenseAmountOverseas: expenseDetails.expenseAmountOverseas,
      expenseAmountSgd: expenseDetails.expenseAmountSgd,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit expense details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} padding={2}>
          <TextField
            name="expenseDescription"
            label="Description"
            fullWidth
            defaultValue={expenseDetails.expenseDescription}
            onChange={handleInputChange}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="expenseCategory"
              defaultValue={expenseDetails.expenseCategory}
              label="Category"
              onChange={handleInputChange}
            >
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Leisure"}>Leisure</MenuItem>
              <MenuItem value={"Transport"}>Transport</MenuItem>
              <MenuItem value={"Shopping"}>Shopping</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                defaultValue={dayjs(expenseDetails.date)}
                onChange={(newValue) =>
                  handleInputChange({
                    target: { name: "date", value: newValue },
                  })
                }
              />
            </DemoContainer>
          </LocalizationProvider>

          <TextField
            label="Amount (SGD)"
            name="expenseAmountSgd"
            fullWidth
            defaultValue={expenseDetails.expenseAmountSgd}
            onChange={handleInputChange}
          />

          {expenseDetails.expenseAmountOverseas > 0 && (
            <TextField
              name="expenseAmountOverseas"
              label="Amount (Overseas)"
              fullWidth
              defaultValue={expenseDetails.expenseAmountOverseas}
              onChange={handleInputChange}
            />
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Delete</Button>
        <Button onClick={handleClose}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
