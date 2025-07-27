"use client";

import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface Option {
  label: string;
  value: string;
}

type InputWithSuggestionProps = {
  name: string;
  label: string;
  options?: Option[];
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  freeSolo?: boolean;
  disabled?: boolean;
};

const InputWithSuggestion = ({
  name,
  label,
  options = [],
  placeholder,
  required = false,
  multiple = false,
  freeSolo = true,
  disabled = false,
}: InputWithSuggestionProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      rules={{
        validate: (value) =>
          required
            ? multiple
              ? Array.isArray(value) && value.length > 0
                ? true
                : `${label} is required`
              : value && value.value
                ? true
                : `${label} is required`
            : true,
      }}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          disabled={disabled}
          value={field.value ?? (multiple ? [] : null)}
          onChange={(_, newValue) => {
            const normalize = (v: any): Option =>
              typeof v === "string" ? { label: v, value: v } : v;

            const processedValue = multiple
              ? Array.isArray(newValue)
                ? newValue.map(normalize)
                : []
              : normalize(newValue);

            field.onChange(processedValue);
          }}
          onInputChange={(_, inputValue, reason) => {
            if (!multiple && freeSolo && reason === "input") {
              field.onChange({ label: inputValue, value: inputValue });
            }
          }}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option?.label || ""
          }
          isOptionEqualToValue={(option, value) =>
            typeof option === "string" || typeof value === "string"
              ? option === value
              : option?.value === value?.value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              required={required}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
};

export default InputWithSuggestion;
