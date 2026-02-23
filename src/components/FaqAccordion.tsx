import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Cuánto dura la cita?",
    answer:
      "Set Clásico y Lash Lift: aprox. 90 min a 2 hrs. Set de Volumen y Mega Volumen: 2–3 hrs. Laminado de Cejas: 60–90 min.",
  },
  {
    question: "¿Cómo llego al studio?",
    answer:
      "Estamos en 2121 W 84th Ave, Federal Heights, CO 80260. Hay estacionamiento disponible frente al local.",
  },
  {
    question: "¿Cuánto duran las extensiones?",
    answer:
      "Con el cuidado adecuado, entre 3 y 4 semanas. Recomendamos relleno cada 2–3 semanas.",
  },
  {
    question: "¿Hacen rellenos?",
    answer: "¡Sí! Pregúntanos el precio al confirmar tu cita.",
  },
  {
    question: "¿Puedo cambiar o cancelar?",
    answer:
      "Sí, con 24 horas de anticipación. Solo mándanos un mensaje y lo coordinamos.",
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ marginTop: "24px" }}>
      <p
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: "12px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Preguntas frecuentes
      </p>
      <div style={{ border: "1px solid #f0f0f0", borderRadius: "10px", overflow: "hidden" }}>
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} style={{ borderBottom: index < FAQ_ITEMS.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              {/* Question row */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left"
                style={{
                  padding: "14px 16px",
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
                    color: "#1a1a1a",
                    lineHeight: 1.4,
                    paddingRight: "12px",
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
                    color: "#9e9e9e",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}
                >
                  +
                </motion.span>
              </button>

              {/* Answer with height animation */}
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
                        padding: "0 16px 14px",
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
