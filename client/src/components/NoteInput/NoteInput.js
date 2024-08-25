import React, { useState } from "react";
import useQuestions from "../../hooks/useQuestions";

const NoteInput = ({ currentQuestion }) => {
  const [currentNote, setCurrentNote] = useState(
    currentQuestion.userNote || ""
  );
  const [isEditing, setIsEditing] = useState(false);
  const { updateQuestion } = useQuestions();

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const saveNote = () => {
    const updatedQuestion = { ...currentQuestion, userNote: currentNote };
    updateQuestion(updatedQuestion);
    setIsEditing(false);
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

  return (
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
  );
};

export default NoteInput;
