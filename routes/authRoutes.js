import express from "express";
import bcrypt from "bcryptjs";
import db from "../firebase.js";

const router = express.Router();
const usersCollection = db.collection("users"); // Firestore collection

// Register endpoint
router.post("/register", async (req, res) => {
  const { parentName, phone, password } = req.body;
  if (!parentName || !phone || !password) return res.status(400).json({ ok: false, error: "Missing fields" });

  // authRoutes.js — inside register endpoint
const userDoc = usersCollection.doc(`${parentName}_${phone}`);
const userSnapshot = await userDoc.get();

if (!userSnapshot.exists) return res.status(404).json({ ok: false, error: "Account not found" });

// Remove the free trial check for now
// if (!userData.approved) return res.status(403).json({ ok: false, error: "You must do a free trial first" });

if (userData.registered) return res.status(400).json({ ok: false, error: "Already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await userDoc.update({
    password: hashedPassword,
    registered: true
  });

  res.json({ ok: true, message: "Registration successful" });
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { parentName, phone, password } = req.body;
  if (!parentName || !phone || !password) return res.status(400).json({ ok: false, error: "Missing fields" });

  const userDoc = usersCollection.doc(`${parentName}_${phone}`);
  const userSnapshot = await userDoc.get();

  if (!userSnapshot.exists) return res.status(404).json({ ok: false, error: "Account not found" });

  const userData = userSnapshot.data();
  if (!userData.registered) return res.status(403).json({ ok: false, error: "You must do a free trial first" });

  const match = await bcrypt.compare(password, userData.password);
  if (!match) return res.status(400).json({ ok: false, error: "Wrong password" });

  res.json({ ok: true, message: "Login successful" });
});

export default router;
