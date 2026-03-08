import { TextField } from "@mui/material";
import { useField } from "formik";
import { BaseFieldProps } from "./types/props.form.interface";

const FormikTextField = ({ name, ...props }: BaseFieldProps) => {
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            {...props}
            error={Boolean(meta.touched && meta.error)}
            helperText={meta.touched && meta.error}
            fullWidth
        />
    );
};

export default FormikTextField;