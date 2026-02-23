import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Duelen las extensiones de pestañas?",
    answer:
      "No, el proceso es relajante. Muchas clientas se quedan dormidas durante la cita.",
  },
  {
    question: "¿Dañan mis pestañas naturales?",
    answer:
      "No, cuando se aplican correctamente por una profesional, no dañan tus pestañas. Usamos productos de alta calidad y técnicas seguras.",
  },
  {
    question: "¿Cuánto duran las extensiones?",
    answer:
      "Con el cuidado adecuado, entre 3 y 4 semanas. Recomendamos relleno cada 2-3 semanas para mantenerlas perfectas.",
  },
  {
    question: "¿Se ven naturales?",
    answer:
      "Totalmente. Personalizamos el largo, curvatura y volumen según la forma de tus ojos para un look que te favorezca.",
  },
  {
    question: "¿Cómo llego al studio?",
    answer:
      "Estamos en 2121 W 84th Ave, Federal Heights, CO 80260. Hay estacionamiento disponible frente al local.",
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ marginTop: "24px" }}>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: "12px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        ✨ Preguntas frecuentes
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                borderRadius: "14px",
                background: isOpen ? "#fff0f5" : "#fff5f8",
                borderLeft: isOpen ? "3px solid #c2185b" : "3px solid transparent",
                transition: "background 200ms ease, border-color 200ms ease",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left"
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: isOpen ? "#c2185b" : "#1a1a1a",
                    lineHeight: 1.4,
                    paddingRight: "12px",
                    transition: "color 200ms ease",
                  }}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "18px",
                    fontWeight: 400,
                    color: isOpen ? "#c2185b" : "#9e9e9e",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#757575",
                        lineHeight: 1.6,
                        padding: "0 16px 12px",
                        margin: 0,
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqAccordion;
