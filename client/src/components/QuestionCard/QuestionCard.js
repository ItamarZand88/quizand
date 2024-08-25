// QuestionCard.js
import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const QuestionCard = ({
  option,
  isSelected,
  isCorrect,
  showResult,
  onClick,
}) => {
  const cardClass = cn(
    "cursor-pointer transition-all duration-300 h-full",
    "border-2 shadow-lg",
    {
      "border-blue-500 bg-blue-50": isSelected && !showResult,
      "border-green-500 bg-green-50": showResult && isCorrect,
      "border-red-500 bg-red-50": showResult && isSelected && !isCorrect,
      "border-gray-300 bg-white": !isSelected && !showResult,
    }
  );

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
        <CardContent className="p-4 text-center relative h-full flex items-center justify-center">
          <div className="text-lg font-medium">{option}</div>
          {showResult && (
            <motion.div
              className="absolute top-2 right-2"
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
