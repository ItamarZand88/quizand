import React, { useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const levelStyles = [
  { bg: "bg-red-100", border: "border-red-500", text: "text-red-500" },
  { bg: "bg-red-200", border: "border-red-400", text: "text-red-400" },
  { bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-500" },
  { bg: "bg-green-100", border: "border-green-400", text: "text-green-400" },
  { bg: "bg-green-100", border: "border-green-500", text: "text-green-500" },
];

const KnowledgeLevelSelector = ({ onSelect, onConfirm }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    onSelect(level);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        {levelStyles.map((style, index) => (
          <Button
            key={index}
            onClick={() => handleLevelSelect(index)}
            className={`flex flex-col items-center p-2 ${style.bg} ${
              style.text
            } rounded-md border-[1px] ${
              style.border
            } shadow-sm transition-all duration-200 hover:shadow-md ${
              selectedLevel === index ? "ring-2 ring-blue-500" : ""
            }`}
            style={{ width: "18%", margin: "0 1%" }}
          >
            {index === 0 ? (
              <AlertCircle className={`h-6 w-6 mb-1 ${style.text}`} />
            ) : index === 4 ? (
              <CheckCircle2 className={`h-6 w-6 mb-1 ${style.text}`} />
            ) : (
              <Progress
                value={(index / 4) * 100}
                className={`w-6 h-6 mb-1 ${style.text}`}
              />
            )}
            <span>{index}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeLevelSelector;
