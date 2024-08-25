import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import "./QuestionCard.css";

const QuestionCard = ({
  option,
  isSelected,
  isCorrect,
  showResult,
  onClick,
}) => {
  const cardClass = cn("question-card", {
    "card-selected": isSelected && !showResult,
    "card-correct": showResult && isCorrect,
    "card-incorrect": showResult && isSelected && !isCorrect,
    "card-default": !isSelected && !showResult,
  });

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      className="h-full"
      whileHover={{ scale: 1.001 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className={cardClass} onClick={onClick}>
        <CardContent className="question-card-content">
          <div className="question-card-text">{option}</div>
          {showResult && (
            <motion.div
              className="question-card-icon"
              initial="hidden"
              animate="visible"
              variants={iconVariants}
            >
              {isCorrect ? (
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
              ) : isSelected ? (
                <XCircleIcon className="w-6 h-6 text-red-500" />
              ) : null}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
