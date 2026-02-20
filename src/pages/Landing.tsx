import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logoSrc from "@/assets/logo.png";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [viewerCount, setViewerCount] = useState(47);

  useEffect(() => {
    const randomize = () => {
      const delay = Math.floor(Math.random() * 3000) + 5000; // 5–8s
      return setTimeout(() => {
        setViewerCount(Math.floor(Math.random() * 46) + 35);
        timerRef.current = randomize();
      }, delay);
    };
    const timerRef: { current: ReturnType<typeof setTimeout> | null } = { current: null };
    timerRef.current = randomize();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      style={{ background: "hsl(350, 60%, 98%)", minHeight: "100dvh" }}
      className="flex items-start justify-center sm:items-center sm:py-8"
    >
      <div
        className="w-full bg-white"
        style={{ maxWidth: "480px" }}
      >
        <style>{`
          @media (min-width: 480px) {
            .landing-card {
              border-radius: 20px !important;
              box-shadow: 0 4px 24px rgba(0,0,0,0.08) !important;
            }
          }
        `}</style>
        <div
          className="landing-card w-full bg-white flex flex-col items-center"
          style={{ padding: "40px 28px 36px", minHeight: "100dvh" }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            alt="Divas Beauty Studio"
            style={{ width: "180px", objectFit: "contain" }}
          />

          {/* Subtext */}
          <p
            style={{
              fontSize: "12px",
              color: "#9e9e9e",
              marginTop: "6px",
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
            }}
          >
            Studio de Pestañas · Thornton, CO
          </p>

          {/* Promo badge */}
          <div
            style={{
              marginTop: "16px",
              background: "#fce4ec",
              color: "#c2185b",
              fontSize: "12px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "999px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            🏷️ 10% de descuento este mes
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              marginTop: "20px",
              lineHeight: 1.3,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Pestañas perfectas.<br />Cita en 60 segundos.
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "15px",
              color: "#9e9e9e",
              textAlign: "center",
              marginTop: "10px",
              lineHeight: 1.5,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
            }}
          >
            Dinos qué te interesa y te contactamos hoy.
          </p>

          {/* CTA Button */}
          <motion.button
            animate={{ opacity: [1, 0.82, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            onClick={() => navigate("/quiz")}
            style={{
              marginTop: "24px",
              width: "100%",
              height: "56px",
              background: "#c2185b",
              color: "white",
              fontSize: "16px",
              fontWeight: 700,
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            Ver mis opciones →
          </motion.button>

          {/* Trust line */}
          <p
            style={{
              fontSize: "12px",
              color: "#9e9e9e",
              textAlign: "center",
              marginTop: "12px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
            }}
          >
            Sin compromiso · Solo 60 segundos
          </p>

          {/* Live viewers badge */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#f5f5f5",
              padding: "6px 12px",
              borderRadius: "999px",
            }}
          >
            {/* Pulsing green dot */}
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                background: "#4caf50",
                borderRadius: "50%",
                animation: "dot-pulse 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "#9e9e9e",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
              }}
            >
              {viewerCount} personas viendo disponibilidad ahora
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
