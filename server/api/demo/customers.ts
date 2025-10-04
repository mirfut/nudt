import type { User } from "~/types";

const customers: User[] = [
    {
        id: 1,
        name: "Alex Smith",
        email: "alex.smith@example.com",
        avatar: {
            src: "https://i.pravatar.cc/128?u=1",
        },
        status: "subscribed",
        location: "New York, USA",
    },
    {
        id: 2,
        name: "Jordan Brown",
        email: "jordan.brown@example.com",
        avatar: {
            src: "https://i.pravatar.cc/128?u=2",
        },
        status: "unsubscribed",
        location: "London, UK",
    },
    {
        id: 3,
        name: "Taylor Green",
        email: "taylor.green@example.com",
        avatar: {
            src: "https://i.pravatar.cc/128?u=3",
        },
        status: "bounced",
        location: "Paris, France",
    },
];

export default eventHandler(async () => {
    return customers;
});
