import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoSrc from "@/assets/logo.png";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
    navigate("/quiz");
  };

  return (
    <div
      style={{ height: "100dvh", overflow: "hidden" }}
      className="flex items-start justify-center sm:items-center sm:py-8"
    >
      <div className="w-full" style={{ maxWidth: "480px", height: "100dvh" }}>
        <style>{`
          @media (min-width: 480px) {
            .landing-card {
              border-radius: 20px !important;
              box-shadow: 0 8px 32px rgba(194,24,91,0.10) !important;
              height: auto !important;
              max-height: 90dvh !important;
            }
            .landing-outer {
              height: auto !important;
            }
          }
        `}</style>
        <div
          className="landing-card w-full flex flex-col items-center"
          style={{
            padding: "40px 28px 44px",
            height: "100dvh",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            background: `
              radial-gradient(ellipse 60% 50% at 10% 10%, rgba(194,24,91,0.06) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 90% 90%, rgba(194,24,91,0.05) 0%, transparent 50%),
              repeating-linear-gradient(
                135deg,
                transparent,
                transparent 18px,
                rgba(194,24,91,0.03) 18px,
                rgba(194,24,91,0.03) 19px
              ),
              #fffaf9
            `,
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            alt="Divas Beauty Studio"
            fetchPriority="high"
            decoding="async"
            width={180}
            height={60}
            style={{ width: "180px", objectFit: "contain" }}
          />

          {/* Promo badge */}
          <div
            style={{
              marginTop: "18px",
              background: "#fff3cd",
              color: "#7a5c00",
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 16px",
              borderRadius: "999px",
              fontFamily: "Montserrat, sans-serif",
              border: "1px solid #f5c842",
              letterSpacing: "0.01em",
            }}
          >
            🎟️ Clientas nuevas — 10% de descuento este mes
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "#1a1a1a",
              textAlign: "center",
              marginTop: "22px",
              lineHeight: 1.25,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Despierta lista.<br />
            <span style={{ color: "#c2185b" }}>Sin rímel. Sin enchinador.</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "16px",
              color: "#555555",
              textAlign: "center",
              marginTop: "12px",
              lineHeight: 1.6,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              maxWidth: "320px",
            }}
          >
            Más de 1,000 mujeres en Thornton ya tienen las pestañas de sus sueños. Tú también puedes.
          </p>

          {/* CTA Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCTA}
            style={{
              marginTop: "28px",
              width: "100%",
              height: "56px",
              background: "#c2185b",
              color: "white",
              fontSize: "17px",
              fontWeight: 700,
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 16px rgba(194,24,91,0.30)",
            }}
          >
            Quiero mi 10% de descuento →
          </motion.button>

          {/* Trust signals — pill badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "16px",
              flexWrap: "wrap",
              rowGap: "8px",
            }}
          >
            {[
              { icon: "🔒", text: "+1,000 clientas", bg: "#f5f5f5", border: "#e0e0e0", color: "#444" },
              { icon: "⭐", text: "5 estrellas Google", bg: "#fff8e1", border: "#ffe082", color: "#7a5c00" },
              { icon: "✅", text: "Satisfacción garantizada", bg: "#f0fff4", border: "#a5d6a7", color: "#2e7d32" },
            ].map((badge) => (
              <span
                key={badge.text}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: badge.color,
                  fontFamily: "Montserrat, sans-serif",
                  whiteSpace: "nowrap",
                  background: badge.bg,
                  border: `1px solid ${badge.border}`,
                  borderRadius: "99px",
                  padding: "8px 14px",
                }}
              >
                {badge.icon} {badge.text}
              </span>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{ textAlign: "center", marginTop: "20px", maxWidth: "300px" }}>
            <p style={{ margin: "0 0 6px", fontSize: "18px", color: "#f5a623", lineHeight: 1 }}>
              ⭐⭐⭐⭐⭐
            </p>
            <p
              style={{
                fontSize: "14px",
                fontStyle: "italic",
                color: "#555",
                margin: "0 0 4px",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.5,
              }}
            >
              "¡Me encantaron mis pestañas! María es una artista. 100% recomendado."
            </p>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#888",
                margin: 0,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              — Sandra M., Thornton, CO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
