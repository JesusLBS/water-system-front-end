export const buildSocioPayload = (
    values: any,
    options: {
        isEdit: boolean;
        uid?: string;
        generateUid: () => string;
    }
) => {

    if (options.isEdit) {
        if (!options.uid) {
            throw new Error('UID is required for update');
        }

        return {
            ...values,
            userData: {
                ...values.userData,
                uid: options.uid
            }
        };
    }

    return {
        ...values,
        userData: {
            ...values.userData,
            uid: options.generateUid()
        }
    };
};