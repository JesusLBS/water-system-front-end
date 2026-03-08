import { TextFieldProps } from "@mui/material";

export type BaseFieldProps = TextFieldProps & {
    name: string;
};

export type SelectFieldProps = BaseFieldProps & {
  options: Option[];
};

type Option = {
  value: string | number;
  label: string;
};