import { Router } from "express";
import { db } from "@workspace/db";
import { usersTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { signJwt, checkPassword } from "../lib/auth.js";

const router = Router();

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase().trim()));
    if (!user || !checkPassword(password, user.password)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }
    const token = signJwt({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      avatar: user.avatar,
      facultyId: user.facultyId,
    });
    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, facultyId: user.facultyId },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

export default router;
