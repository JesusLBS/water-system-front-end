import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Box, IconButton } from '@mui/material';
import FormStepper from './Stepper';
import {
    SocioDetailResponse,
    SocioRow
} from '../interfaces/socio.interface';
import SocioService from '../services/socioService';
import { GridCloseIcon } from '@mui/x-data-grid';

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

    const [initialData, setInitialData] = useState<any>(undefined);
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
                const data = response.data;
                const mappedData = {
                    userData: {
                        uid: data.user.uid,
                        name: data.user.name,
                        email: data.user.email,
                        roleId: '1'
                    },
                    profileData: {
                        lastName: data.profile.lastName,
                        secondLastName: data.profile.secondLastName,
                        mobile: data.profile.mobile,
                        birthdate: data.profile.birthdate
                    },
                    addressData: {
                        address: data.address.address,
                        city: data.address.city
                    }
                };

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
                    key={initialData?.userData?.uid || 'create'}
                    mode={mode}
                    initialData={isEdit ? initialData : undefined}
                    onSubmit={handleFormSubmit}
                />
            </Box>
        </Dialog>
    );
};

export default FormDialog;