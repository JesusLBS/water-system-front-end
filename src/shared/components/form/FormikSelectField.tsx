import { TextField, MenuItem } from "@mui/material";
import { useField } from "formik";
import { SelectFieldProps } from "./types/props.form.interface";

const FormikSelectField = ({ name, options, ...props }: SelectFieldProps) => {
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            {...props}
            select
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            fullWidth
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default FormikSelectField;