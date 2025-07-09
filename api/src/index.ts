import { __prod__ } from "./constants.js";
import prisma from "./context/db.js";
import { createServer } from "./server.js";

try {
  const server = await createServer();

  const port = process.env.PORT;

  server.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
  });
} catch (error) {
  console.error("Error starting server:", error);
  await prisma.$disconnect();
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
