import React from 'react';
import { Dialog, DialogTitle, Box } from '@mui/material';
import FormStepper from './Stepper';

interface FormDialogProps {
    openDialog: boolean;
    onClose: () => void;
    isEdit: boolean;
    item?: any;
}

const FormDialog: React.FC<FormDialogProps> = ({ openDialog, onClose, isEdit }) => {
    const handleSubmit = (finalData: any) => {
        console.log('Final form data:');
        console.log(JSON.stringify(finalData, null, 2));
        onClose();
    };

    return (
        <Dialog open={openDialog} onClose={onClose}>
            <DialogTitle>{isEdit ? 'Edit Socio' : 'Add New Socio'}</DialogTitle>
            <Box sx={{ padding: 2 }}>
                <FormStepper onSubmit={handleSubmit} />
            </Box>
        </Dialog>
    );
};

export default FormDialog;
