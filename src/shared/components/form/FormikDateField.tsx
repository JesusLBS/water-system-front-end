import { TextField } from "@mui/material";
import { useField } from "formik";
import { BaseFieldProps } from "./types/props.form.interface";

const FormikDateField = ({ name, ...props }: BaseFieldProps) => {
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            {...props}
            type="date"
            slotProps={{
                inputLabel: { shrink: true },
            }}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            fullWidth
        />
    );
};

export default FormikDateField;