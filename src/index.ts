// src/index.ts
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes

app.get("/", async (req: Request, res: Response) => {
  try {
    // Create two users
    await prisma.user.create({
      data: {
        email: "user1@example.com",
        password: "", // Empty string for now, replace with actual password if needed
        firstName: "User",
        lastName: "One",
      },
    });

    await prisma.user.create({
      data: {
        email: "user2@example.com",
        password: "", // Empty string for now, replace with actual password if needed
        firstName: "User",
        lastName: "Two",
      },
    });
    // Retrieve all users
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});