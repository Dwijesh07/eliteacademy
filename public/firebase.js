import admin from "firebase-admin";
import path from "path";

const serviceAccount = path.resolve("serviceAccountKey.json"); // path to your JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // Firestore instance

export default db;
