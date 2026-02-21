import { faker } from '@faker-js/faker';

export const generateMockFormData = () => {
    return {
        userData: {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            roleId: faker.number.int({ min: 1, max: 3 }).toString(),
        },
        profileData: {
            lastName: faker.person.lastName(),
            secondLastName: faker.person.lastName(),
            mobile: '55' + faker.string.numeric(8),
            birthdate: faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
                .toISOString()
                .split('T')[0],
        },
        addressData: {
            address: faker.location.streetAddress(),
            city: faker.location.city(),
        },
    };
};