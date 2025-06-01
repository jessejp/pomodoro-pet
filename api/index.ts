import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
/*   await prisma.user.create({
    data: {
      name: "jesse",
      isPublic: false,
      pomodoroSessions: {
        create: {
          startDate: new Date(),
          endDate: new Date(),
          stopDate: new Date(),
          workTimeMinutes: 25,
          breakTimeMinutes: 5,
          rounds: 4,
        },
      },
      tasks: {
        create: {
          name: "setting up prisma",
          isDone: false,
          totalCompletedSeconds: 57,
        },
      },
    },
  }); */

  const allUsers = await prisma.user.findMany({
    include: {
      _count: true,
      pomodoroSessions: true,
      tasks: true,
    },
  });

  console.dir(allUsers, { depth: null });
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
