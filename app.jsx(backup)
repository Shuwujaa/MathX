// App.jsx
import { useEffect, useState } from "react";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import questions from "./QS/set3.json";
import "./App.css";

const QuizQuestion = ({ data, selected, locked, onSelect }) => {
  return (
    <div className="question-card">
      <h2 className="question-text">
        <Latex>{data.question}</Latex>
      </h2>
      <div className="options">
        {data.options.map((opt, i) => {
          const isCorrect = opt === data.answer;
          const isSelected = opt === selected;
          let className = "option-btn";
          if (locked) {
            if (isCorrect) className += " correct";
            else if (isSelected) className += " wrong";
          } else if (isSelected) className += " selected";

          return (
            <button
              key={i}
              className={className}
              onClick={() => !locked && onSelect(opt)}
              disabled={locked}
            >
              <Latex>{opt}</Latex>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [index, setIndex] = useState(() => {
    const saved = localStorage.getItem("quizIndex");
    return saved ? parseInt(saved) : 0;
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("quizScore");
    return saved ? parseInt(saved) : 0;
  });
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[index];
  const progress = ((index + 1) / totalQuestions) * 100;

  // Save progress
  useEffect(() => {
    localStorage.setItem("quizIndex", index);
    localStorage.setItem("quizScore", score);
  }, [index, score]);

  // Handle selection
  const handleSelect = (option) => {
    if (locked) return;
    setSelected(option);
    setLocked(true);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  };

  // Navigation
  const nextQuestion = () => {
    if (index + 1 < totalQuestions) {
      setIndex((prev) => prev + 1);
      setSelected(null);
      setLocked(false);
    } else {
      setQuizCompleted(true);
      localStorage.removeItem("quizIndex");
      localStorage.removeItem("quizScore");
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setSelected(null);
      setLocked(false);
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setQuizCompleted(false);
    localStorage.removeItem("quizIndex");
    localStorage.removeItem("quizScore");
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKey = (e) => {
      if (quizCompleted) return;

      // Option select via keys 1-4
      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (currentQuestion.options[idx]) {
          handleSelect(currentQuestion.options[idx]);
        }
      }

      // Enter or Right Arrow -> Next
      if (e.key === "Enter" || e.key === "ArrowRight") {
        if (locked) nextQuestion();
      }

      // Left Arrow -> Previous
      if (e.key === "ArrowLeft") {
        prevQuestion();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, locked, quizCompleted, currentQuestion]);

  return (
    <div className="app">
      {!quizCompleted ? (
        <>
          <div className="top-bar">
            <div className="quiz-progress">
              Question {index + 1} / {totalQuestions}
            </div>
            <div className="quiz-score">Score: {score}</div>
          </div>

          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          <QuizQuestion
            data={currentQuestion}
            selected={selected}
            locked={locked}
            onSelect={handleSelect}
          />

          <div className="controls">
          
            <button className="next-btn" onClick={nextQuestion} disabled={!locked}>
              {index + 1 === totalQuestions ? "Finish Quiz" : "Next"}
            </button>
          </div>

      
        </>
      ) : (
        <div className="results">
          <h2>Quiz Completed</h2>
          <p className="score">
            Your Total Score: {score} / {totalQuestions}
          </p>
          <button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
