import { Autocomplete, TextField, Chip, useTheme } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { AutocompleteProps } from "@mui/material/Autocomplete";

type Option = {
  label: string;
  value: string;
};

type AutocompleteInputProps = {
  name: string;
  label: string;
  options?: Option[];
  required?: boolean;
  disabled?: boolean;
  freeSolo?: boolean;
  multiple?: boolean;
  placeholder?: string;
  variant?: "outlined" | "standard" | "filled";
  allowCustomValues?: boolean;
  chipVariant?: "filled" | "outlined";
  size?: "small" | "medium";
} & Omit<
  Partial<AutocompleteProps<string, boolean, boolean, boolean>>,
  "renderInput" | "options" | "value"
>;

export default function AutocompleteInput({
  name,
  label,
  options = [],
  required = false,
  disabled = false,
  freeSolo = false,
  multiple = false,
  placeholder,
  variant = "outlined",
  allowCustomValues = false,
  chipVariant = "outlined",
  size = "medium",
  ...autocompleteProps
}: AutocompleteInputProps) {
  const theme = useTheme();
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={multiple ? [] : null}
      rules={{
        validate: (value) => {
          if (!required) return true;
          if (multiple) {
            return Array.isArray(value) && value.length > 0
              ? true
              : `${label} is required`;
          }
          return value ? true : `${label} is required`;
        },
      }}
      render={({ field, fieldState }) => {
        const getOptionLabel = (option: string) => {
          if (allowCustomValues) return option;
          return options.find((o) => o.value === option)?.label || option;
        };

        const getSelectedValue = () => {
          if (multiple) {
            return Array.isArray(field.value)
              ? field.value.map((v) => getOptionLabel(v))
              : [];
          }
          return field.value ? getOptionLabel(field.value) : null;
        };

        const handleChange = (
          _: React.SyntheticEvent,
          newValue: string | string[] | null
        ) => {
          if (multiple) {
            const values = Array.isArray(newValue) ? newValue : [];
            field.onChange(
              values.map((v) =>
                allowCustomValues
                  ? v
                  : options.find((o) => o.label === v)?.value || v
              )
            );
          } else {
            field.onChange(
              newValue
                ? allowCustomValues
                  ? newValue
                  : options.find((o) => o.label === newValue)?.value || newValue
                : null
            );
          }
        };

        return (
          <Autocomplete
            {...autocompleteProps}
            multiple={multiple}
            freeSolo={allowCustomValues || freeSolo}
            disabled={disabled}
            options={options.map((option) => option.label)}
            value={getSelectedValue()}
            onChange={handleChange}
            onBlur={field.onBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={variant}
                label={label}
                placeholder={placeholder}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                required={required}
                size={size}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={index}
                  label={option}
                  variant={chipVariant}
                  size={size}
                  sx={{
                    marginRight: theme.spacing(0.5),
                    marginBottom: theme.spacing(0.5),
                  }}
                />
              ))
            }
            sx={{
              "& .MuiAutocomplete-tag": {
                margin: theme.spacing(0.5),
              },
            }}
            isOptionEqualToValue={(option, value) =>
              option.toLowerCase() === value?.toLowerCase()
            }
            getOptionLabel={getOptionLabel}
          />
        );
      }}
    />
  );
}
