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
          className="landing-card w-full flex flex-col items-center justify-center"
          style={{
            padding: "20px 12px 20px",
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
            width={120}
            height={40}
            style={{ width: "120px", objectFit: "contain" }}
          />

          {/* Promo badge */}
          <div
            style={{
            marginTop: "14px",
              background: "#fff3cd",
              color: "#7a5c00",
              fontSize: "11px",
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: "999px",
              fontFamily: "Montserrat, sans-serif",
              border: "1px solid #f5c842",
              letterSpacing: "0.01em",
            }}
          >
            🎟️ 10% de descuento este mes
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 800,
              color: "#1a1a1a",
              textAlign: "center",
              marginTop: "14px",
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
              fontSize: "14px",
              color: "#555555",
              textAlign: "center",
              marginTop: "12px",
              lineHeight: 1.6,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              maxWidth: "100%",
            }}
          >
            Más de 1,000 mujeres en Denver ya lucen pestañas increíbles. Toca el botón y agenda tu cita hoy.
          </p>

          {/* CTA Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleCTA}
            style={{
              marginTop: "16px",
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

          {/* Trust badges */}
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {[
              { text: "💖 +1,000 clientas felices", bg: "#FFF0F3", color: "#C2185B" },
              { text: "✅ Satisfacción garantizada", bg: "#FFF0F3", color: "#C2185B" },
              { text: "⭐ Atención personalizada", bg: "#FFF0F3", color: "#C2185B" },
            ].map((b, i) => (
              <span
                key={i}
                style={{
                  background: b.bg,
                  color: b.color,
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "5px 12px",
                  borderRadius: "999px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {b.text}
              </span>
            ))}
          </div>

          {/* Reviews title */}
          <p
            style={{
              marginTop: "16px",
              fontSize: "15px",
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Lo que dicen nuestras clientas
          </p>

          {/* Reviews scroller */}
          <div
            style={{
              marginTop: "8px",
              width: "100%",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              display: "flex",
              gap: "10px",
              paddingBottom: "4px",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
            className="[&::-webkit-scrollbar]:hidden"
          >
            {[
              { quote: "¡Me encantaron mis pestañas! María es una artista. 100% recomendado.", name: "Sandra M." },
              { quote: "Mis pestañas duran semanas. Ya no uso rímel. ¡Las amo!", name: "Lucía R." },
              { quote: "El mejor servicio en Denver. Súper profesional y rápido.", name: "Ana G." },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  minWidth: "240px",
                  maxWidth: "240px",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
                }}
              >
                <p style={{ margin: 0, fontSize: "12px", color: "#f5a623", lineHeight: 1 }}>⭐⭐⭐⭐⭐</p>
                <p
                  style={{
                    margin: "6px 0 4px",
                    fontSize: "11px",
                    fontStyle: "italic",
                    color: "#555",
                    fontFamily: "Montserrat, sans-serif",
                    lineHeight: 1.45,
                  }}
                >
                  "{r.quote}"
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "10px",
                    fontWeight: 600,
                    color: "#999",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  — {r.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
