import { faker } from '@faker-js/faker';

export const generateMockFormData = () => {
    return {
        user: {
            name: faker.person.firstName(),
            email: faker.internet.email(),
            roleId: faker.number.int({ min: 1, max: 2 }).toString(),
        },
        profile: {
            lastName: faker.person.lastName(),
            secondLastName: faker.person.lastName(),
            mobile: '55' + faker.string.numeric(8),
            birthdate: faker.date.birthdate({ min: 18, max: 60, mode: 'age' })
                .toISOString()
                .split('T')[0],
        },
        address: {
            address: faker.location.streetAddress(),
            city: faker.location.city(),
        },
    };
};