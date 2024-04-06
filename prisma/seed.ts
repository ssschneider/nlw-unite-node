import { prisma } from "../src/lib/prisma";

async function seed () {
    await prisma.event.create({
        data: {
            id: "646d0917-2c16-4f86-820f-9b7cc4f9789f",
            title: "Awesome Event",
            slug: "awesome-event",
            details: "Um evento padrão muito para devs muito maneiros!",
            maximumAttendees: 150,
        }
    });
};

seed().then(() => {
    console.log("Database seeded!");
    prisma.$disconnect();
});