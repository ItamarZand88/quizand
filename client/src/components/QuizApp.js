import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import QuestionCard from "./QuestionCard";
import KnowledgeLevelSelector from "./KnowledgeLevelSelector";
import useQuestions from "../hooks/useQuestions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import LoaderAnimation from "./LoaderAnimation";

const QuizApp = () => {
  const { questions, updateQuestion, loading, error } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentNote, setCurrentNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

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
    setCurrentNote(randomQuestion.userNote || "");
    setSelectedAnswer(null);
    setIsEditing(false);
  }, [questions]);

  useEffect(() => {
    if (questions.length > 0 && quizStarted && !currentQuestion) {
      selectQuestion();
    }
  }, [questions, quizStarted, currentQuestion, selectQuestion]);

  const handleCorrectAnswer = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      gravity: 1.5,
      ticks: 150,
      decay: 0.9,
      scalar: 0.8,
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
    selectQuestion();
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    updateQuestionScore(index === currentQuestion.correctAnswer ? 1 : 0);
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

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const saveNote = () => {
    if (currentQuestion) {
      const updatedQuestion = { ...currentQuestion, userNote: currentNote };
      updateQuestion(updatedQuestion);
      setCurrentQuestion(updatedQuestion);
      setIsEditing(false);
    }
  };

  const handleNoteClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    saveNote();
  };

  if (loading) return <LoaderAnimation />;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        שגיאה בטעינת השאלות: {error}
      </div>
    );

  const progress = calculateProgress();

  return (
    <div className="container mx-auto p-4 min-h-screen" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-2xl mx-auto shadow-lg overflow-hidden bg-white rounded-lg">
          <CardHeader className="bg-slate-800 text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">
              QuizMe
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion ? currentQuestion.id : "empty"}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion ? (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 bg-slate-100 p-4 rounded-lg">
                      {currentQuestion.question}
                    </h3>
                    {currentQuestion.image && (
                      <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={currentQuestion.image}
                          alt="תמונת שאלה"
                          className="w-full h-auto max-h-80 object-contain"
                        />
                      </div>
                    )}
                    <div className="space-y-4">
                      {currentQuestion.options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <QuestionCard
                            option={option}
                            isSelected={selectedAnswer === index}
                            isCorrect={index === currentQuestion.correctAnswer}
                            showResult={showResult}
                            onClick={() => {
                              if (!showResult) {
                                handleAnswerSelect(index);
                                if (index === currentQuestion.correctAnswer) {
                                  handleCorrectAnswer();
                                }
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* תיבת ההערות המעוצבת */}
                    <div className="inputContainer">
                      <input
                        type="text"
                        className="input"
                        value={currentNote}
                        onChange={handleNoteChange}
                        onBlur={handleBlur}
                        placeholder="הוסף הערות כאן..."
                        onClick={handleNoteClick}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      ברוכים הבאים לחידון!
                    </h2>
                    <p className="text-slate-600 mb-6">
                      בחנו את הידע שלכם ולמדו דברים חדשים.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col items-center bg-slate-100 rounded-b-lg p-4">
            {showResult && (
              <KnowledgeLevelSelector
                onSelect={(level) => {
                  updateQuestionScore(level / 4);
                  selectQuestion();
                }}
              />
            )}
            {!showResult && (
              <Button
                onClick={quizStarted ? selectQuestion : startQuiz}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white mt-2"
              >
                {quizStarted ? "שאלה הבאה" : "התחל"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4 p-3 bg-slate-100 rounded-lg shadow max-w-xs mx-auto"
      >
        <div className="text-center mb-2">
          <span className="text-sm font-medium text-slate-800">
            {progress.totalAnswered} מתוך {progress.totalQuestions}
          </span>
        </div>
        <div className="relative">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-slate-300">
            <div
              style={{ width: `${progress.progressPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .inputContainer {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
        }

        .input {
          width: 100%;
          min-height: 45px;
          color: #333;
          outline: none;
          transition: 0.35s;
          padding: 0px 7px;
          background-color: #f0f0f0;
          border-radius: 6px;
          border: 2px solid #e0e0e0;
        }

        .input::placeholder {
          color: #999;
        }

        .input:focus::placeholder {
          transition: 0.2s;
          opacity: 0;
        }

        .input:focus {
          transform: scale(1.01);
          background-color: #e8e8e8;
          box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.2),
            inset -2px -2px 5px rgba(255, 255, 255, 0.7);
          border-color: #d0d0d0;
        }
      `}</style>
    </div>
  );
};

export default QuizApp;
