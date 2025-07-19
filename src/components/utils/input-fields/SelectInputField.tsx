"use client";
import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  type SelectChangeEvent,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type OptionType = string | { _id?: string; label?: string; name?: string };

type SelectInputFieldProps = {
  label: string;
  name: string;
  options: OptionType[];
  defaultValue?: string;
  requiredMessage?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

const SelectInputField: React.FC<SelectInputFieldProps> = ({
  label,
  name,
  options,
  defaultValue = "",
  requiredMessage,
  disabled = false,
  onChange,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={requiredMessage ? { required: requiredMessage } : undefined}
      render={({ field, fieldState }) => (
        <FormControl fullWidth disabled={disabled} error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            value={field.value || ""}
              onChange={(event: SelectChangeEvent) => {
                const value = event.target.value as string;
                field.onChange(value);
                if (onChange) {
                  onChange(value);
                }
              }}
            >
              {options.map((option) => {
                if (typeof option === "string") {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      key={option._id || option.label || option.name || ""}
                      value={option._id || option.label || option.name || ""}
                    >
                      {option.name || option.label || option._id || ""}
                    </MenuItem>
                  );
                }
              })}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default SelectInputField;
