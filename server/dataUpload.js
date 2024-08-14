const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

const app = express();
app.use(cors());
app.use(express.json());

const firebaseConfig = {
  apiKey: "AIzaSyBM-l9z8yLRTBa4V8gpX9pXZxB2ois7Fa0",
  authDomain: "quizapp-fd858.firebaseapp.com",
  projectId: "quizapp-fd858",
  storageBucket: "quizapp-fd858.appspot.com",
  messagingSenderId: "443887025620",
  appId: "1:443887025620:web:eb09e1572fc270b613ea41",
  measurementId: "G-EHWNWEFFK5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const uploadJsonAndImages = async () => {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "public", "questions.json"), "utf-8")
    );

    for (const question of jsonData.questions) {
      if (question.image) {
        const filePath = path.join(__dirname, "public", question.image);
        const fileBuffer = fs.readFileSync(filePath);
        const storageRef = ref(
          storage,
          `images/${Date.now()}-${path.basename(question.image)}`
        );

        // Upload the image
        const snapshot = await uploadBytes(storageRef, fileBuffer);
        const imageUrl = await getDownloadURL(snapshot.ref);

        // Set the Firestore document
        const questionRef = doc(db, "questions", `${question.id}`);
        await setDoc(questionRef, {
          ...question,
          image: imageUrl,
        });
        console.log(
          `Uploaded and set in Firestore: Question ID ${question.id}`
        );
      } else {
        const questionRef = doc(db, "questions", `${question.id}`);
        await setDoc(questionRef, question);
        console.log(
          `Data set in Firestore without image: Question ID ${question.id}`
        );
      }
    }
  } catch (error) {
    console.error("Error uploading data and images:", error);
  }
};

app.get("/upload-data", async (req, res) => {
  try {
    await uploadJsonAndImages();
    res.status(200).send("Data and images uploaded successfully!");
  } catch (error) {
    res.status(500).send("Error uploading data: " + error.message);
  }
});

app.listen(3000, () => console.log("App listening on port 3000"));
