import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10); // Convert PORT to number

app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.get("/api", async (req: Request, res: Response) => {
  try {
    // Check if users already exist
    const existingUser1 = await prisma.user.findUnique({
      where: { email: "user1@example.com" },
    });

    const existingUser2 = await prisma.user.findUnique({
      where: { email: "user2@example.com" },
    });

    // Create users only if they do not exist
    if (!existingUser1) {
      await prisma.user.create({
        data: {
          email: "user1@example.com",
          password: "", // Empty string for now, replace with actual password if needed
          firstName: "User",
          lastName: "One",
        },
      });
    }

    if (!existingUser2) {
      await prisma.user.create({
        data: {
          email: "user2@example.com",
          password: "", // Empty string for now, replace with actual password if needed
          firstName: "User",
          lastName: "Two",
        },
      });
    }

    // Retrieve all users
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/", async (req: Request, res: Response) => {
  res.json("Hello from node-express");
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    // Check if users already exist
    const existingUser1 = await prisma.user.findUnique({
      where: { email: "user1@example.com" },
    });

    const existingUser2 = await prisma.user.findUnique({
      where: { email: "user2@example.com" },
    });

    // Create users only if they do not exist
    if (!existingUser1) {
      await prisma.user.create({
        data: {
          email: "user1@example.com",
          password: "", // Empty string for now, replace with actual password if needed
          firstName: "User",
          lastName: "One",
        },
      });
    }

    if (!existingUser2) {
      await prisma.user.create({
        data: {
          email: "user2@example.com",
          password: "", // Empty string for now, replace with actual password if needed
          firstName: "User",
          lastName: "Two",
        },
      });
    }

    // Retrieve all users
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
