import { faker, tr } from '@faker-js/faker';

export type User = {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    userOrders?: {
        id: string;
        date: string;
        totalPrice: number;
    }[];
    addresses?: {
        id: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    }[];
};

export const createFakeUser = (userCount: number, admin = false) => {
    const users = [];
    for (let i = 0; i < userCount; i++) {
        const user: User = {
            id: faker.string.uuid(),
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            userOrders: [],
            addresses: [],
        };
        users.push(user);

        if (!admin) {
            const orderCount = faker.number.int({ min: 2, max: 10 });
            for (let k = 0; k < orderCount; k++) {
                const order = {
                    id: faker.string.uuid(),
                    date: faker.date.recent().toISOString(),
                    totalPrice: faker.number.float({ min: 10, max: 1000 }),
                };
                users[i].userOrders.push(order);
            }

            const addressCount = faker.number.int({ min: 1, max: 3 });
            for (let k = 0; k < addressCount; k++) {
                const address = {
                    id: faker.string.uuid(),
                    address: faker.location.streetAddress(),
                    city: faker.location.city(),
                    state: faker.location.state(),
                    zip: faker.location.zipCode(),
                };
                users[i].addresses.push(address);
            }
        }
    }


    return users;
}

