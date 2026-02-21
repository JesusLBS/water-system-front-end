import React from 'react';
import { Dialog, DialogTitle, Box } from '@mui/material';
import FormStepper from './Stepper';
import { SocioRow } from '../interfaces/socio.interface';

interface FormDialogProps {
    openDialog: boolean;
    onClose: () => void;
    isEdit: boolean;
    isShow?: boolean;
    item?: SocioRow;
    onSubmit: (data: any, isEdit: boolean) => void;
}

const FormDialog: React.FC<FormDialogProps> = ({ openDialog, onClose, isEdit, isShow, item, onSubmit }) => {

    if (isEdit) {
        //console.log(JSON.stringify(item, null, 2))
    }
    const handleFormSubmit = (values: any) => {
        onSubmit(values, isEdit);
    };

    return (
        <Dialog open={openDialog} onClose={onClose} disableRestoreFocus aria-labelledby="form-dialog-title">
            {!isShow && <DialogTitle>{isEdit ? 'Edit Socio' : 'Add New Socio'}</DialogTitle>}
            <Box sx={{ padding: 2 }}>
                <FormStepper onSubmit={handleFormSubmit} />
            </Box>
        </Dialog>
    );
};

export default FormDialog;
