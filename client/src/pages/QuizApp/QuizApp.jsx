import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PencilLoader from "../../components/LoaderAnimation/PencilLoader";
import KnowledgeLevelSelector from "../../components/KnowledgeLevelSelector/KnowledgeLevelSelector";
import QuizContent from "../../components/QuizContent/QuizContent";
import { handleCorrectAnswer } from "../../components/quizUtils";
import useQuestions from "../../hooks/useQuestions";
import { motion, AnimatePresence } from "framer-motion";
import "./QuizApp.css";

const QuizApp = () => {
  const { questions, updateQuestion, loading, error } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const navigate = useNavigate();

  const calculateProgress = useCallback(() => {
    const answeredQuestions = questions.filter(
      (q) => q.scoreHistory.length > 0
    );
    return {
      totalAnswered: answeredQuestions.length,
      totalQuestions: questions.length,
      progressPercentage: (answeredQuestions.length / questions.length) * 100,
    };
  }, [questions]);

  const selectQuestion = useCallback(() => {
    const weightedQuestions = questions.flatMap((q) =>
      Array(5 - Math.floor(q.averageScore || 0)).fill(q)
    );

    if (weightedQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const randomQuestion =
      weightedQuestions[Math.floor(Math.random() * weightedQuestions.length)];
    setCurrentQuestion(randomQuestion);
    setShowResult(false);
    setSelectedAnswer(null);
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && quizStarted && !currentQuestion) {
      selectQuestion();
    }
  }, [questions, quizStarted, currentQuestion, selectQuestion]);

  const startQuiz = () => {
    setQuizStarted(true);
    selectQuestion();
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentQuestion.correctAnswer) {
      handleCorrectAnswer();
    }
  };

  const updateQuestionScore = (score) => {
    if (currentQuestion) {
      const newScoreHistory = [...currentQuestion.scoreHistory, score];
      const newAverageScore =
        newScoreHistory.reduce((a, b) => a + b, 0) / newScoreHistory.length;
      const updatedQuestion = {
        ...currentQuestion,
        scoreHistory: newScoreHistory,
        averageScore: newAverageScore,
      };
      updateQuestion(updatedQuestion);
      setCurrentQuestion(updatedQuestion);
    }
  };

  if (loading) return <PencilLoader />;
  if (error)
    return (
      <div className="error-message">Error loading questions: {error}</div>
    );

  const progress = calculateProgress();

  return (
    <div className="quiz-container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="quiz-content"
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          className="home-link"
        >
          HOME &#8594;
        </a>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">QuizMe - Machine Learning</h3>
          </div>
          <div className="card-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion ? currentQuestion.id : "empty"}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion ? (
                  <QuizContent
                    currentQuestion={currentQuestion}
                    showResult={showResult}
                    selectedAnswer={selectedAnswer}
                    handleAnswerSelect={handleAnswerSelect}
                  />
                ) : (
                  <div className="no-questions-message">
                    {quizStarted
                      ? "There are no more questions available."
                      : "Press 'Start Quiz' to begin."}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="card-footer">
            {showResult && (
              <KnowledgeLevelSelector
                onSelect={(level) => {
                  updateQuestionScore(level / 4);
                  selectQuestion();
                }}
              />
            )}
            {!showResult && (
              <button
                onClick={quizStarted ? selectQuestion : startQuiz}
                className="button"
              >
                {quizStarted ? "Next Question" : "Start Quiz"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="progress-container"
      >
        <div className="progress-text">
          {progress.totalAnswered} out of {progress.totalQuestions}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizApp;
