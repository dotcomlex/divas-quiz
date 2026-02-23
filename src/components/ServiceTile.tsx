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
  imagePosition?: string;
  description?: string;
  badgeText?: string;
  badgeType?: "discount" | "flat";
  highlightBorder?: boolean;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
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
  imagePosition = "center center",
  description,
  badgeText,
  badgeType = "discount",
  highlightBorder = false,
  loading = "lazy",
  fetchPriority = "auto",
  onSelect,
}) => {
  const borderColor = isSelected
    ? "#c2185b"
    : highlightBorder
      ? "#F0C0D4"
      : "#edd5df";
  const borderWidth = isSelected ? "2px" : "1.5px";

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      className="relative flex flex-col cursor-pointer select-none"
      style={{
        border: `${borderWidth} solid ${borderColor}`,
        borderRadius: "12px",
        overflow: "hidden",
        background: isSelected ? "#FFFBFC" : "white",
        transition: "border-color 150ms ease, box-shadow 150ms ease, background 150ms ease",
        boxShadow: isSelected
          ? "inset 0 1px 6px rgba(194,24,91,0.10), 0 1px 4px rgba(0,0,0,0.04)"
          : "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      {/* ── Image / Emoji zone ── */}
      <div
        style={{
          position: "relative",
          height: "110px",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={name}
            decoding="async"
            loading={loading}
            fetchPriority={fetchPriority}
            width={175}
            height={120}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: imagePosition }}
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

        {/* Bottom gradient fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30px",
            background: "linear-gradient(to bottom, transparent, white)",
            pointerEvents: "none",
          }}
        />

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

        {/* Favorita badge */}
        {isFavorite && (
          <span
            style={{
              position: "absolute",
              top: "6px",
              left: "6px",
              background: "linear-gradient(135deg, #f5c842, #e6b830)",
              color: "white",
              fontSize: "9px",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "99px",
              lineHeight: 1.5,
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.05em",
              textShadow: "0 1px 2px rgba(0,0,0,0.15)",
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
          background: isSelected ? "#FFFBFC" : "white",
          borderRadius: "0 0 10px 10px",
        }}
      >
        {/* Service name */}
        <p
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#1a1a1a",
            margin: "0 0 2px",
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.25,
          }}
        >
          {name}
        </p>

        {/* Description */}
        {description && (
          <p
            style={{
              fontSize: "12px",
              fontWeight: 400,
              color: "#555",
              margin: "0 0 4px",
              fontFamily: "Montserrat, sans-serif",
              lineHeight: 1.3,
            }}
          >
            {description}
          </p>
        )}

        {/* Pricing */}
        {isFlat ? (
          <>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#c2185b",
                margin: "0 0 3px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {salePrice}
            </p>
            {badgeText && (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#666",
                  background: "#F5F5F5",
                  borderRadius: "99px",
                  padding: "3px 8px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {badgeText}
              </span>
            )}
          </>
        ) : (
          (() => {
            const savingsPercent = originalPrice
              ? Math.round((parseFloat(originalPrice.replace("$", "")) - parseFloat(salePrice.replace("$", ""))) / parseFloat(originalPrice.replace("$", "")) * 100)
              : null;
            return (
              <>
                <div style={{ display: "flex", alignItems: "baseline", gap: "5px", margin: "0 0 3px" }}>
                  {originalPrice && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#aa7777",
                        textDecoration: "line-through",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {originalPrice}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "hsl(336, 78%, 43%)",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {salePrice}
                  </span>
                </div>
                {savingsPercent && savingsPercent > 0 && (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#2e7d32",
                      background: "#e8f5e9",
                      borderRadius: "99px",
                      padding: "2px 8px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Ahorras {savingsPercent}%
                  </span>
                )}
              </>
            );
          })()
        )}
      </div>
    </motion.div>
  );
};

export default ServiceTile;
