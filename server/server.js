require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} = require("firebase/firestore");

const app = express();
app.use(cors());
app.use(express.json());

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Route to get all questions
app.get("/api/questions", async (req, res) => {
  try {
    const questionsSnapshot = await getDocs(collection(db, "questions"));
    const questions = [];
    questionsSnapshot.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
    });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route to update a single question
app.put("/api/questions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = req.body;

    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, updatedQuestion);

    res.json({ success: true, message: "Question updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
