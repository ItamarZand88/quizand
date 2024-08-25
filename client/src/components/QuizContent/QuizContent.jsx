import React from "react";
import { motion } from "framer-motion";
import QuestionCard from "../QuestionCard/QuestionCard";
import NoteInput from "../NoteInput/NoteInput";
import "./QuizContent.css";

const QuizContent = ({
  currentQuestion,
  showResult,
  selectedAnswer,
  handleAnswerSelect,
}) => {
  if (!currentQuestion) {
    return (
      <div className="empty-state">
        <h2 className="empty-state-title">
          Let's make learning fun with QuizMe!
        </h2>
      </div>
    );
  }

  return (
    <div className="quiz-content">
      <h3 className="question-text">{currentQuestion.question}</h3>
      {currentQuestion.image && (
        <div className="question-image-container">
          <img
            src={currentQuestion.image}
            alt="Question"
            className="question-image"
          />
        </div>
      )}
      <div className="answers-grid">
        {currentQuestion.options.map((option, index) => (
          <motion.div
            key={index}
            className="answer-option-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <QuestionCard
              option={option}
              isSelected={selectedAnswer === index}
              isCorrect={index === currentQuestion.correctAnswer}
              showResult={showResult}
              onClick={() => !showResult && handleAnswerSelect(index)}
            />
          </motion.div>
        ))}
      </div>
      <NoteInput currentQuestion={currentQuestion} />
    </div>
  );
};

export default QuizContent;
