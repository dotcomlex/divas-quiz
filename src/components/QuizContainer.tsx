import React from "react";

interface QuizContainerProps {
  children: React.ReactNode;
  className?: string;
}

const QuizContainer: React.FC<QuizContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      style={{ background: "hsl(350, 60%, 98%)", minHeight: "100dvh" }}
      className="flex items-start justify-center sm:items-center sm:py-8"
    >
      <div
        className={`w-full bg-white overflow-hidden ${className}`}
        style={{
          maxWidth: "480px",
          // Desktop: card with radius + shadow. Mobile: full bleed
        }}
      >
        {/* Mobile: edge-to-edge, no radius, no shadow */}
        {/* Desktop (sm+): card style applied via media queries below */}
        <style>{`
          @media (min-width: 480px) {
            .quiz-inner {
              border-radius: 20px !important;
              box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
            }
          }
        `}</style>
        <div className="quiz-inner w-full bg-white" style={{ minHeight: "100dvh" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
