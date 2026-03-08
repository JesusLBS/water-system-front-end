import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import { createDependentService } from "../services/dependentService";
import { DataDTO, DependentRow } from "../interfaces/dependent.interface";
import { RELATIONSHIPS } from "../mockData/relationshipsMockData";
import FormikTextField from "../../../../../../shared/components/form/FormikTextField";
import FormikSelectField from "../../../../../../shared/components/form/FormikSelectField";
import FormikDateField from "../../../../../../shared/components/form/FormikDateField";
import { generateMockDependent } from "../mockData/dependentMockData";
import { showErrorToast, showSuccessToast } from "../../../../../../utils/toastNotifications";
import { delay } from "../../../../../../utils/async";

interface Props {
    socioUid: string;
    dependent: DependentRow | null;
    onSaved: () => void;
}

const validationSchema = Yup.object({
    name: Yup.string().required("Nombre requerido").min(2),
    lastName: Yup.string().required("Apellido requerido").min(2),
    secondLastName: Yup.string().required("Segundo apellido requerido").min(2),
    mobile: Yup.string().required("Teléfono requerido").min(7).max(15),
    birthdate: Yup.date().required("Fecha requerida").max(new Date()),
    relationshipId: Yup.number().required("Selecciona una relación"),
});

const DependentForm: React.FC<Props> = ({ socioUid, dependent, onSaved }) => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';

    const service = useMemo(() => createDependentService(socioUid), [socioUid]);
    const [detail, setDetail] = useState<DataDTO | null>(null);
    const [loading, setLoading] = useState(false);

    const mockValues = useMemo(() => {
        if (!useMock) return null;
        return generateMockDependent();
    }, [useMock]);

    useEffect(() => {

        if (!dependent?.id) {
            setDetail(null);
            return;
        }

        const fetchDetail = async () => {

            setLoading(true);

            try {

                const response = await service.edit(dependent.id);

                setDetail(response.data);

            } finally {
                await delay()
                setLoading(false);
            }
        };

        fetchDetail();

    }, [dependent?.id, service]);

    const formik = useFormik({

        enableReinitialize: true,

        validationSchema,

        initialValues: detail
            ? {
                name: detail.name || "",
                lastName: detail.lastName || "",
                secondLastName: detail.secondLastName || "",
                mobile: detail.mobile || "",
                birthdate: detail.birthdate?.split?.("T")[0] || "",
                relationshipId: detail.relationshipId || "",
                isFamilyHead: detail.isFamilyHead ?? false,
            }
            : mockValues || {
                name: "",
                lastName: "",
                secondLastName: "",
                mobile: "",
                birthdate: "",
                relationshipId: "",
                isFamilyHead: false,
            },

        onSubmit: async (values, helpers) => {

            const isEdit = Boolean(detail);

            try {

                const dependentData = {
                    name: values.name,
                    lastName: values.lastName,
                    secondLastName: values.secondLastName,
                    mobile: values.mobile,
                    birthdate: values.birthdate,
                    relationshipId: Number(values.relationshipId),
                    isFamilyHead: values.isFamilyHead ?? false,
                };

                const payload = isEdit
                    ? {
                        dependentId: detail?.id,
                        ...dependentData
                    }
                    : {
                        dependents: [dependentData]
                    };

                const response = isEdit
                    ? await service.update(payload)
                    : await service.store(payload);

                await delay()

                if (!response?.ok) {

                    showErrorToast(
                        isEdit
                            ? "No se pudo actualizar el dependiente"
                            : "No se pudo crear el dependiente"
                    );

                    return;
                }

                showSuccessToast(
                    isEdit
                        ? "Dependiente actualizado correctamente"
                        : "Dependiente creado correctamente"
                );

                helpers.resetForm();
                setDetail(null);
                onSaved();

            } catch (error) {
                showErrorToast("Error inesperado al guardar el dependiente");
            }
        },
    });

    const relationshipOptions = [
        { value: "", label: "Selecciona una relación" },
        ...RELATIONSHIPS.map((r) => ({
            value: r.id,
            label: r.description,
        })),
    ];

    return (
        <Box>
            {
                loading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="300px"
                    >
                        <CircularProgress />
                    </Box >
                ) : (
                    <FormikProvider value={formik}>

                        <Box>

                            <Typography variant="h6" mb={2}>
                                {detail ? "Editar Dependiente" : "Nuevo Dependiente"}
                            </Typography>

                            <Stack spacing={2}>

                                <FormikTextField
                                    name="name"
                                    label="Nombre"
                                />

                                <FormikTextField
                                    name="lastName"
                                    label="Apellido"
                                />

                                <FormikTextField
                                    name="secondLastName"
                                    label="Segundo Apellido"
                                />

                                <FormikTextField
                                    name="mobile"
                                    label="Teléfono"
                                />

                                <FormikDateField
                                    name="birthdate"
                                    label="Fecha de nacimiento"
                                />

                                <FormikSelectField
                                    name="relationshipId"
                                    label="Relación"
                                    options={relationshipOptions}
                                />

                                <FormControl>

                                    <FormLabel>¿Es jefe de familia?</FormLabel>

                                    <RadioGroup
                                        row
                                        value={formik.values.isFamilyHead ? "true" : "false"}
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                "isFamilyHead",
                                                e.target.value === "true"
                                            )
                                        }
                                    >

                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="No"
                                        />

                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="Sí"
                                        />

                                    </RadioGroup>

                                </FormControl>

                                <Button
                                    variant="contained"
                                    onClick={() => formik.handleSubmit()}
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting
                                        ? (detail ? "Actualizando..." : "Guardando...")
                                        : (detail ? "Actualizar" : "Guardar")}
                                </Button>

                            </Stack>

                        </Box>

                    </FormikProvider>
                )}
        </Box>
    );
};

export default DependentForm;