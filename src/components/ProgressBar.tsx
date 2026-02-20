import React from "react";

interface ProgressBarProps {
  step: number; // 1, 2, or 3
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex w-full gap-1" style={{ height: "6px" }}>
      {[1, 2, 3].map((seg) => (
        <div
          key={seg}
          className="flex-1 rounded-full transition-all"
          style={{
            background: seg <= step ? "#c2185b" : "#e0e0e0",
            transitionDuration: "300ms",
            transitionTimingFunction: "ease",
            height: "6px",
          }}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
