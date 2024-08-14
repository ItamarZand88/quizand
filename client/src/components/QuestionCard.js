import React from "react";
import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";

const QuestionCard = ({
  option,
  isSelected,
  isCorrect,
  showResult,
  onClick,
}) => {
  const cardClass = cn(
    "cursor-pointer transition-all",
    showResult && {
      "bg-green-100 border-green-500": isCorrect,
      "bg-red-100 border-red-500": isSelected && !isCorrect,
    },
    !showResult && isSelected
  );

  return (
    <Card className={cardClass} onClick={onClick}>
      <CardContent className="p-4 text-center">{option}</CardContent>
    </Card>
  );
};

export default QuestionCard;
