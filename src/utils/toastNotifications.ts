import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
};

// Error toast
export const showErrorToast = (message: string, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultOptions, ...options });
};

// Success toast
export const showSuccessToast = (message: string, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultOptions, ...options });
};

// Info toast
export const showInfoToast = (message: string, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultOptions, ...options });
};
