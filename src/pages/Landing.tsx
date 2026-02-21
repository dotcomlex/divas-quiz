import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoSrc from "@/assets/logo.png";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ minHeight: "100dvh" }}
      className="flex items-start justify-center sm:items-center sm:py-8"
    >
      <div className="w-full" style={{ maxWidth: "480px" }}>
        <style>{`
          @media (min-width: 480px) {
            .landing-card {
              border-radius: 20px !important;
              box-shadow: 0 8px 32px rgba(194,24,91,0.10) !important;
              min-height: auto !important;
            }
          }
          @keyframes cta-pulse {
            0%, 100% { box-shadow: 0 4px 20px rgba(194,24,91,0.35); }
            50% { box-shadow: 0 4px 32px rgba(194,24,91,0.60); }
          }
        `}</style>
        <div
          className="landing-card w-full flex flex-col items-center"
          style={{
            padding: "40px 28px 44px",
            minHeight: "100dvh",
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
            style={{ width: "180px", objectFit: "contain" }}
          />

          {/* Promo badge — amber/yellow highlight */}
          <div
            style={{
              marginTop: "18px",
              background: "#fff3cd",
              color: "#92600a",
              fontSize: "12px",
              fontWeight: 700,
              padding: "6px 16px",
              borderRadius: "999px",
              fontFamily: "Montserrat, sans-serif",
              border: "1px solid #f5c842",
              letterSpacing: "0.01em",
            }}
          >
            🏷️ 10% de descuento este mes
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "27px",
              fontWeight: 800,
              color: "#1a1a1a",
              textAlign: "center",
              marginTop: "22px",
              lineHeight: 1.25,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Pestañas perfectas,<br />
            <span style={{ color: "#c2185b" }}>10% OFF solo este mes.</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "15px",
              color: "#555555",
              textAlign: "center",
              marginTop: "12px",
              lineHeight: 1.6,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              maxWidth: "340px",
            }}
          >
            Elige tu servicio, déjanos tu número y te confirmamos tu cita hoy mismo. Rápido y sin compromiso.
          </p>

          {/* CTA Button */}
          <motion.button
            animate={{ opacity: [1, 0.88, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            onClick={() => navigate("/quiz")}
            style={{
              marginTop: "28px",
              width: "100%",
              height: "58px",
              background: "#c2185b",
              color: "white",
              fontSize: "17px",
              fontWeight: 800,
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.01em",
              animation: "cta-pulse 2.4s ease-in-out infinite",
            }}
          >
            Ver Servicios y Precios →
          </motion.button>

          {/* Trust signals */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0",
              marginTop: "14px",
              flexWrap: "wrap",
              rowGap: "6px",
            }}
          >
            {[
              { icon: "✅", text: "+1,000 clientas" },
              { icon: "⭐", text: "5 estrellas" },
              { icon: "🎁", text: "10% off hoy" },
            ].map((badge, i, arr) => (
              <React.Fragment key={badge.text}>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#555555",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge.icon} {badge.text}
                </span>
                {i < arr.length - 1 && (
                  <span
                    style={{
                      margin: "0 8px",
                      color: "#ccc",
                      fontSize: "12px",
                    }}
                  >
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
