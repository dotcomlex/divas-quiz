import React, { useState, useEffect } from "react";

interface ProgressBarProps {
  step: number; // 1, 2, 3, or 4
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const [endowedWidth, setEndowedWidth] = useState(step === 1 ? 60 : 100);

  useEffect(() => {
    if (step === 1) {
      setEndowedWidth(60);
      const timer = setTimeout(() => setEndowedWidth(100), 50);
      return () => clearTimeout(timer);
    } else {
      setEndowedWidth(100);
    }
  }, [step]);

  return (
    <div className="flex w-full gap-[6px]" style={{ height: "6px" }}>
      {[1, 2, 3, 4].map((seg) => {
        const isFilled = seg <= step;
        const isEndowed = seg === 1 && step === 1;

        return (
          <div
            key={seg}
            style={{
              flex: 1,
              borderRadius: "99px",
              background: isFilled ? "#c2185b" : "#F0F0F0",
              height: "6px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {isEndowed && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: `${endowedWidth}%`,
                  background: "#c2185b",
                  borderRadius: "99px",
                  transition: "width 600ms ease-out",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
