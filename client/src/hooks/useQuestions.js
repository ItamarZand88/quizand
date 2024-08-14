import { useState, useEffect } from "react";

const API_URL = "http://localhost:3001"; // או כתובת השרת שלך

const useQuestions = () => {
  const [questions, setQuestionsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions from:", `${API_URL}/api/questions`);
        const response = await fetch(`${API_URL}/api/questions`);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }
        const data = await response.json();
        console.log("Questions fetched successfully:", data);

        setQuestionsState(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const updateQuestion = async (updatedQuestion) => {
    try {
      const response = await fetch(
        `${API_URL}/api/questions/${updatedQuestion.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedQuestion),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update question");
      }

      setQuestionsState((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === updatedQuestion.id ? updatedQuestion : q
        )
      );
    } catch (error) {
      console.error("Error updating question:", error);
      setError(error.message);
    }
  };

  return { questions, updateQuestion, loading, error };
};

export default useQuestions;
