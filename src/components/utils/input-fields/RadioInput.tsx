/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: boolean | string | number;
};

type RadioInputProps = {
  name: string;
  label: string;
  options: Option[];
  required?: boolean;
  requiredMessage?: string;
  row?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
};

const RadioInput = ({
  name,
  label,
  options,
  required = false,
  requiredMessage,
  row = true,
  disabled = false,
  onChange,
}: RadioInputProps) => {
  const { control } = useFormContext();

  return (
    <FormControl component="fieldset" fullWidth disabled={disabled}>
      <FormLabel component="legend" required={required}>
        {label}
      </FormLabel>
      <Controller
        name={name}
        control={control}
        rules={
          required
            ? {
                required: requiredMessage || "This field is required",
              }
            : undefined
        }
        render={({ field, fieldState }) => (
          <>
            <RadioGroup
              {...field}
              row={row}
              onChange={(e) => {
                let value: any = e.target.value;
                if (value === "true") value = true;
                else if (value === "false") value = false;
                else if (!isNaN(Number(value)) && value !== "") {
                  value = Number(value);
                }
                
                field.onChange(value);
                onChange?.(value);
              }}
              value={field.value?.toString() || ""}
            >
              {options.map(({ value, label }) => (
                <FormControlLabel
                  key={`${name}-${value}`}
                  value={value.toString()}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
            {fieldState.error && (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default RadioInput;