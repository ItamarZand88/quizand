// QuizApp.js
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
import { Progress } from "./ui/progress";
import QuestionCard from "./QuestionCard";
import KnowledgeLevelSelector from "./KnowledgeLevelSelector";
import useQuestions from "../hooks/useQuestions";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

// Import Heroicons
import { PencilIcon, CheckIcon } from "@heroicons/react/24/solid";

const QuizApp = () => {
  const { questions, updateQuestion, loading, error } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentNote, setCurrentNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveNote();
    }
  };

  if (loading) return <div className="text-center py-10">טוען שאלות...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        שגיאה בטעינת השאלות: {error}
      </div>
    );

  return (
    <div className="container mx-auto p-4 min-h-screen  bg-pattern" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl mx-auto shadow-2xl overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
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
                    <h3 className="text-xl font-semibold mb-2 text-slate-800">
                      {currentQuestion.question}
                    </h3>
                    {currentQuestion.image && (
                      <div className="mb-4 rounded-lg overflow-hidden shadow-md">
                        <img
                          src={currentQuestion.image}
                          alt="תמונת שאלה"
                          className="w-full"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4 mb-4">
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

                    <Card className="mt-2 bg-sky-100">
                      <CardContent className="p-2 flex justify-between items-center">
                        {isEditing ? (
                          <Textarea
                            value={currentNote}
                            onChange={handleNoteChange}
                            onKeyPress={handleKeyPress}
                            className="w-full"
                            placeholder="הוסף הערות כאן..."
                          />
                        ) : (
                          <p className="text-sm text-right">
                            {currentQuestion.userNote || "אין הערות"}
                          </p>
                        )}
                        <Button
                          onClick={
                            isEditing ? saveNote : () => setIsEditing(true)
                          }
                          className="p-1"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                        >
                          {isEditing ? (
                            <CheckIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <PencilIcon className="w-5 h-5 text-gray-500" />
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <p className="text-center py-10 text-slate-800">
                    {quizStarted
                      ? "לחץ על 'שאלה הבאה' כדי להמשיך"
                      : "לחץ על 'התחל' כדי להתחיל את החידון!"}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100 rounded-b-lg p-4">
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
        className="mt-4 text-center text-sm text-slate-500"
      >
        <Progress
          value={
            (questions.filter((q) => q.averageScore > 0).length /
              questions.length) *
            100
          }
          className="w-full mb-2"
        />
        השלמת {questions.filter((q) => q.averageScore > 0).length} מתוך{" "}
        {questions.length} שאלות
      </motion.div>
    </div>
  );
};

export default QuizApp;
