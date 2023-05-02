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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useContext } from "react";
import dayjs from "dayjs";
import api from "../utils/axiosConfig";
import MyContext from "../utils/reactContext";
import ConfirmationDialog from "./ConfirmationDialog";

function ExpenseAmount({ expenseDetails, handleInputChange }) {
  const [value, setValue] = React.useState("expenseAmountSgd");

  const handleChange = (event) => {
    if (event.target.value === "SGD") {
      setValue("expenseAmountSgd");
    } else {
      setValue("expenseAmountOverseas");
    }
  };

  if (typeof expenseDetails.tripName != "undefined") {
    return (
      <>
        <TextField
          label="Amount"
          name={value}
          fullWidth
          onChange={handleInputChange}
        />
        <FormControl>
          <FormLabel>Currency</FormLabel>
          <RadioGroup onChange={handleChange}>
            <FormControlLabel value="SGD" control={<Radio />} label="SGD" />
            <FormControlLabel
              value="Overseas"
              control={<Radio />}
              label="Overseas"
            />
          </RadioGroup>
        </FormControl>
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
      />
    );
  }
}
export default function ExpenseDialog({ open, closeDialog, expenseDetails }) {
  const { reRender } = useContext(MyContext);

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

  const handleClose = () => {
    setFormData({
      expenseCategory: expenseDetails.expenseCategory,
      expenseDescription: expenseDetails.expenseDescription,
      date: expenseDetails.date,
      tripName: expenseDetails.tripName,
      expenseAmountOverseas: expenseDetails.expenseAmountOverseas,
      expenseAmountSgd: expenseDetails.expenseAmountSgd,
    });
    closeDialog();
  };

  const handleUpdate = async () => {
    const res = await api
      .post(`expenses/${expenseDetails._id}`, formData)
      .then((x) => x.data);
    handleClose();
    reRender();
  };

  const handleDelete = async () => {
    await api.delete(`expenses/${expenseDetails._id}`);
    handleClose();
    reRender();
  };

  return (
    <>
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
                  defaultValue={dayjs(expenseDetails.date).subtract(1, "day")}
                  onChange={(newValue) =>
                    handleInputChange({
                      target: { name: "date", value: newValue.add(1, "day") },
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
            <ExpenseAmount
              expenseDetails={expenseDetails}
              handleInputChange={handleInputChange}
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <ConfirmationDialog callBack={handleDelete} />
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
