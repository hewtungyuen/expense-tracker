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
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useContext } from "react";
import api from "../utils/axiosConfig";
import MyContext from "../utils/reactContext";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";

const AmountField = ({ overseas, register }) => {
  const [selectedValue, setSelectedValue] = React.useState("expenseAmountSgd");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  if (overseas === "true") {
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
          fullWidth
          inputProps={{ inputMode: "numeric" }}
          {...register(selectedValue)}
        />
        <TextField
          label="Exchange rate"
          fullWidth
          inputProps={{ inputMode: "numeric" }}
          {...register("exchangeRate")}
        />
      </>
    );
  } else {
    return (
      <TextField
        label="Amount (SGD)"
        fullWidth
        inputProps={{ inputMode: "numeric" }}
        {...register(selectedValue)}
      />
    );
  }
};
export default function AddExpenseDialog({ open, closeDialog, overseas }) {
  const { reRender } = useContext(MyContext);
  const { register, handleSubmit, setValue } = useForm();
  const routeParams = useParams();
  const telegramId = routeParams.telegramId;
  const [searchParams] = useSearchParams();

  const onSubmit = async (data) => {
    data.telegramId = telegramId;
    data.expenseAmountSgd = parseFloat(data.expenseAmountSgd, 2);
    data.expenseAmountOverseas = parseFloat(data.expenseAmountOverseas, 2);
    data.date = data.date.add(1, "day");
    if (overseas === "true") {
      data.tripName = searchParams.get("tripName");
    }
    await api.post("/expenses", data);
    reRender();
    closeDialog();
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Add new expense</DialogTitle>
        <DialogContent>
          <Stack spacing={2} padding={2}>
            <TextField
              label="Description"
              fullWidth
              {...register("expenseDescription")}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                defaultValue={""}
                {...register("expenseCategory")}
              >
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Leisure"}>Leisure</MenuItem>
                <MenuItem value={"Transport"}>Transport</MenuItem>
                <MenuItem value={"Shopping"}>Shopping</MenuItem>
                <MenuItem value={"Others"}>Others</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Date"
                  onChange={(value) => setValue("date", value)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <AmountField overseas={overseas} register={register} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
