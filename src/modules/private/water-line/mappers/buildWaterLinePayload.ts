export const buildWaterLinePayload = (
    values: { name: string },
    options: {
        isEdit: boolean;
        id?: number;
    }
) => {

    const payload = {
        name: values.name.trim(),
    };

    if (options.isEdit) {
        if (!options.id) {
            throw new Error('ID is required for update');
        }

        return {
            ...payload,
            id: options.id
        };
    }

    return payload;
};