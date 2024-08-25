import React from "react";
import { motion } from "framer-motion";

const QuizProgress = ({ progress }) => {
  return (
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
  );
};

export default QuizProgress;
