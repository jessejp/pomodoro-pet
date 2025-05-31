import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
/*   await prisma.user.create({
    data: {
      name: "jesse",
      is_public: false,
      sessions: {
        create: {
          start_date: new Date(),
          total_completed_seconds: 69,
          tasks: {
            create: {
              name: "setting up prisma",
              is_done: false,
              total_completed_seconds: 57,
            },
          },
        },
      },
    },
  }); */

  const allUsers = await prisma.user.findMany({
    include: {
      _count: true,
      sessions: true,
    },
  });

  console.dir(allUsers, {depth: null});
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
