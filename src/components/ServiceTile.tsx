import React from "react";
import { motion } from "framer-motion";

interface ServiceTileProps {
  emoji: string;
  name: string;
  originalPrice?: string;
  salePrice: string;
  isFlat?: boolean;
  isFavorite?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceTile: React.FC<ServiceTileProps> = ({
  emoji,
  name,
  originalPrice,
  salePrice,
  isFlat = false,
  isFavorite = false,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.96 }}
      onClick={onSelect}
      className="relative flex flex-col items-center justify-center text-center cursor-pointer select-none"
      style={{
        position: "relative",
        background: isSelected ? "#fce4ec" : "#ffffff",
        border: isSelected ? "2px solid #c2185b" : "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "14px 8px",
        minHeight: "120px",
        transition: "border-color 150ms ease, background 150ms ease",
      }}
    >
      {/* Favorita badge */}
      {isFavorite && (
        <span
          style={{
            position: "absolute",
            top: "6px",
            left: "6px",
            background: "#c2185b",
            color: "white",
            fontSize: "9px",
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: "4px",
            lineHeight: 1.4,
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          ⭐ Favorita
        </span>
      )}

      {/* Checkmark */}
      {isSelected && (
        <span
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "#c2185b",
            fontSize: "12px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          ✓
        </span>
      )}

      {/* Emoji */}
      <span style={{ fontSize: "26px", lineHeight: 1 }}>{emoji}</span>

      {/* Service name */}
      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#1a1a1a",
          marginTop: "8px",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.3,
        }}
      >
        {name}
      </span>

      {/* Pricing */}
      {isFlat ? (
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#1a1a1a",
            marginTop: "4px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          {salePrice}
        </span>
      ) : (
        <div className="flex flex-col items-center" style={{ marginTop: "4px" }}>
          {originalPrice && (
            <span
              style={{
                fontSize: "11px",
                color: "#9e9e9e",
                textDecoration: "line-through",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {originalPrice}
            </span>
          )}
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#c2185b",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {salePrice}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceTile;
