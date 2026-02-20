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
  imageSrc?: string;
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
  imageSrc,
  onSelect,
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className="relative flex flex-col cursor-pointer select-none"
      style={{
        border: isSelected ? "2px solid #c2185b" : "1.5px solid #edd5df",
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        boxShadow: isSelected
          ? "0 2px 12px rgba(194,24,91,0.18)"
          : "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Image / Emoji zone ── */}
      <div
        style={{
          position: "relative",
          height: "100px",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #fce4ec 0%, #fdf6f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              lineHeight: 1,
            }}
          >
            {emoji}
          </div>
        )}

        {/* Selected tint overlay */}
        {isSelected && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(194,24,91,0.08)",
            }}
          />
        )}

        {/* Favorita badge — yellow accent */}
        {isFavorite && (
          <span
            style={{
              position: "absolute",
              top: "6px",
              left: "6px",
              background: "#f5c842",
              color: "#7a5c00",
              fontSize: "9px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "4px",
              lineHeight: 1.5,
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            ⭐ FAVORITA
          </span>
        )}

        {/* Checkmark */}
        {isSelected && (
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "7px",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#c2185b",
              color: "white",
              fontSize: "10px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            ✓
          </span>
        )}
      </div>

      {/* ── Info zone ── */}
      <div
        style={{
          padding: "9px 10px 11px",
          background: "white",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {/* Service name */}
        <p
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#1a1a1a",
            margin: "0 0 3px",
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.25,
          }}
        >
          {name}
        </p>

        {/* Pricing */}
        {isFlat ? (
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#c2185b",
              margin: 0,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {salePrice}
          </p>
        ) : (
          <>
            {originalPrice && (
              <p
                style={{
                  fontSize: "11px",
                  color: "#9e9e9e",
                  textDecoration: "line-through",
                  margin: "0 0 1px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {originalPrice}
              </p>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#c2185b",
                  margin: 0,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {salePrice}
              </p>
              <span
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#7a5c00",
                  background: "#fff8e1",
                  border: "1px solid #ffe082",
                  borderRadius: "4px",
                  padding: "1px 5px",
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                -10%
              </span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ServiceTile;
