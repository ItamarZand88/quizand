import { useState, useEffect } from "react";

// Update this URL to your Firebase function endpoint
const API_URL = process.env.REACT_APP_API_URL;

const useQuestions = () => {
  const [questions, setQuestionsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      console.log("Starting fetchQuestions function...");

      try {
        const url = `${API_URL}/questions`;
        console.log("Fetching questions from URL:", url);

        const response = await fetch(url);
        console.log("Received response status:", response.status);
        
        if (!response.ok) {
          console.error("Response was not ok. Status:", response.status);
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Questions fetched successfully:", data);

        setQuestionsState(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const updateQuestion = async (updatedQuestion) => {
    console.log("Starting updateQuestion function...");
    
    try {
      const url = `${API_URL}/questions/${updatedQuestion.id}`;
      console.log("Updating question at URL:", url);
      console.log("Payload:", updatedQuestion);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuestion),
      });

      console.log("Received response status for update:", response.status);
      
      if (!response.ok) {
        console.error("Failed to update question. Status:", response.status);
        throw new Error("Failed to update question");
      }

      setQuestionsState((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        )
      );
      console.log("Question updated successfully:", updatedQuestion);
    } catch (error) {
      console.error("Error updating question:", error.message);
      setError(error.message);
    }
  };

  return { questions, updateQuestion, loading, error };
};

export default useQuestions;
