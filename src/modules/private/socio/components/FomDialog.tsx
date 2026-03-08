import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Box, IconButton } from '@mui/material';
import FormStepper from './Stepper';
import {
    SocioDetailResponse,
    SocioRow
} from '../interfaces/socio.interface';
import SocioService from '../services/socioService';
import { GridCloseIcon } from '@mui/x-data-grid';
import { mapSocioDetailToForm } from '../mappers/socio.mapper';
import { SocioFormModel } from '../interfaces/payload.interface';

interface FormDialogProps {
    openDialog: boolean;
    onClose: () => void;
    isEdit: boolean;
    item?: SocioRow;
    onSubmit: (data: any, isEdit: boolean) => void;
}

const socioService = new SocioService();

const FormDialog: React.FC<FormDialogProps> = ({
    openDialog,
    onClose,
    isEdit,
    item,
    onSubmit
}) => {

    const [initialData, setInitialData] = useState<SocioFormModel | undefined>(undefined);
    const mode: 'create' | 'edit' = isEdit ? 'edit' : 'create';

    useEffect(() => {
        if (!openDialog) {
            setInitialData(undefined);
        }
    }, [openDialog]);

    useEffect(() => {

        if (!openDialog) return;
        if (!isEdit) return;
        if (!item?.uid) return;

        const fetchSocioDetail = async () => {
            try {
                const response: SocioDetailResponse =
                    await socioService.edit(item.uid);
                const mappedData = mapSocioDetailToForm(response.data)
                setInitialData(mappedData);
            } catch (error) {
                console.error('Error fetching socio detail', error);
            }
        };

        fetchSocioDetail();

    }, [openDialog, isEdit, item?.uid]);

    const handleFormSubmit = (values: any) => {
        onSubmit(values, isEdit);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={(_, reason) => {
                if (reason === 'backdropClick') return;
                onClose();
            }}
            disableRestoreFocus
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr: 1,
                }}
            >
                {isEdit ? 'Edit Socio' : 'Add New Socio'}

                <IconButton onClick={onClose} size="small">
                    <GridCloseIcon />
                </IconButton>
            </DialogTitle>

            <Box sx={{ padding: 2 }}>
                <FormStepper
                    key={initialData?.user?.uid || 'create'}
                    mode={mode}
                    initialData={isEdit ? initialData : undefined}
                    onSubmit={handleFormSubmit}
                />
            </Box>
        </Dialog>
    );
};

export default FormDialog;