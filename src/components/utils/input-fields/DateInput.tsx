import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DateInputProps = {
  name: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
};

const DateInput = ({
  name,
  label,
  required = false,
  fullWidth = true,
}: DateInputProps) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: "This field is required" } : undefined}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value ? dayjs(value) : null}
            onChange={(date) => {
              onChange(date ? date.toISOString() : null);
            }}
            slotProps={{
              textField: {
                fullWidth,
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
