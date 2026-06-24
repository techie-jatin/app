import { Request, Response, NextFunction } from "express";
import { verifyJwt, type JwtPayload } from "../lib/auth.js";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }
  try {
    req.user = verifyJwt(auth.slice(7));
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({ error: "Admin access required" });
      return;
    }
    next();
  });
}
