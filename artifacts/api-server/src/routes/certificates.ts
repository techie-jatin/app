import { Router } from "express";
import { db } from "@workspace/db";
import { certificatesTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();
const uid = () => Math.random().toString(36).slice(2, 10);

router.get("/certificates", requireAuth, async (_req, res) => {
  try {
    res.json(await db.select().from(certificatesTable).orderBy(certificatesTable.certificateNo));
  } catch { res.status(500).json({ error: "Failed to fetch certificates" }); }
});

router.post("/certificates", requireAuth, async (req, res) => {
  try {
    const id = uid();
    const { issuedAt: _i, ...rest } = req.body;
    await db.insert(certificatesTable).values({ id, issuedAt: null, ...rest });
    const [row] = await db.select().from(certificatesTable).where(eq(certificatesTable.id, id));
    res.status(201).json(row);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? "Failed to create certificate" });
  }
});

router.post("/certificates/:id/issue", requireAuth, async (req, res) => {
  try {
    const issuedAt = new Date().toISOString().split("T")[0];
    await db.update(certificatesTable).set({ status: "issued", issuedAt }).where(eq(certificatesTable.id, req.params.id));
    const [row] = await db.select().from(certificatesTable).where(eq(certificatesTable.id, req.params.id));
    if (!row) { res.status(404).json({ error: "Certificate not found" }); return; }
    res.json(row);
  } catch { res.status(500).json({ error: "Failed to issue certificate" }); }
});

export default router;
