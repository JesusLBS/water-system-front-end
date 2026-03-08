import { faker } from "@faker-js/faker";

const relationships = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const generateMockDependent = () => {

    const birthdate = faker.date.birthdate({
        min: 1,
        max: 18,
        mode: "age",
    });

    return {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        secondLastName: faker.person.lastName(),
        mobile: "55" + faker.string.numeric(8),
        birthdate: birthdate.toISOString().split("T")[0],
        relationshipId: faker.helpers.arrayElement(relationships),
        isFamilyHead: false,
    };
};