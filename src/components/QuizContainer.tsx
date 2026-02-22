import React from "react";

interface QuizContainerProps {
  children: React.ReactNode;
  className?: string;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      style={{ background: "hsl(350, 60%, 98%)", height: "100dvh", overflow: "hidden" }}
      className="flex items-start justify-center sm:items-center sm:py-8"
    >
      <div
        className={`w-full bg-white overflow-hidden ${className}`}
        style={{
          maxWidth: "480px",
          height: "100dvh",
        }}
      >
        <style>{`
          @media (min-width: 480px) {
            .quiz-inner {
              border-radius: 20px !important;
              box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
              height: auto !important;
              max-height: 90dvh !important;
            }
          }
        `}</style>
        <div className="quiz-inner w-full bg-white" style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
