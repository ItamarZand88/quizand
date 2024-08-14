import React from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

// Function to return background and border color classes based on the level
const getStylesForLevel = (level) => {
  const styles = [
    { bg: "bg-red-100", border: "border-red-500", text: "text-red-500" },
    { bg: "bg-red-200", border: "border-red-400", text: "text-red-400" },
    {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      text: "text-yellow-500",
    },
    { bg: "bg-green-100", border: "border-green-400", text: "text-green-400" },
    { bg: "bg-green-100", border: "border-green-500", text: "text-green-500" },
  ];
  return styles[level];
};

const KnowledgeLevelSelector = ({ onSelect }) => {
  return (
    <div className="w-full">
      <p className="text-center mb-4 font-bold text-slate-800">
        עד כמה טוב ידעת את זה?
      </p>
      <div className="flex justify-between">
        {[0, 1, 2, 3, 4].map((level) => {
          const { bg, border, text } = getStylesForLevel(level);
          return (
            <Button
              key={level}
              onClick={() => onSelect(level)}
              className={`flex flex-col items-center p-2 ${bg} ${text} rounded-md border-[1px] ${border} shadow-sm transition-all duration-200 hover:shadow-md`}
              style={{
                width: "18%",
                margin: "0 1%",
              }}
            >
              {level === 0 ? (
                <AlertCircle className={`h-6 w-6 mb-1 ${text}`} />
              ) : level === 4 ? (
                <CheckCircle2 className={`h-6 w-6 mb-1 ${text}`} />
              ) : (
                <Progress
                  value={(level / 4) * 100}
                  className={`w-6 h-6 mb-1 ${text}`}
                />
              )}
              <span>{level}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default KnowledgeLevelSelector;
