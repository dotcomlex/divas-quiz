import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import ServiceTile from "@/components/ServiceTile";
import FaqAccordion from "@/components/FaqAccordion";
import logoSrc from "@/assets/logo.png";
import imgHybrid from "@/assets/services/hybrid.jpg";
import imgClasico from "@/assets/services/clasico.jpg";
import imgVolumen from "@/assets/services/volumen.jpg";
import imgMega from "@/assets/services/mega.jpg";
import imgLashlift from "@/assets/services/lashlift.jpg";
import imgCejas from "@/assets/services/cejas.jpg";

type Screen = "quiz" | "disqualified" | "success";

const SERVICES = [
  { emoji: "✨", name: "Set Híbrido", originalPrice: "$149.99", salePrice: "$134.99", isFavorite: true, isFlat: false, imageSrc: imgHybrid },
  { emoji: "🌸", name: "Set Clásico", originalPrice: "$99.99", salePrice: "$89.99", isFavorite: false, isFlat: false, imageSrc: imgClasico },
  { emoji: "💎", name: "Set de Volumen", originalPrice: "$179.99", salePrice: "$161.99", isFavorite: false, isFlat: false, imageSrc: imgVolumen },
  { emoji: "👑", name: "Mega Volumen", originalPrice: "$119.99", salePrice: "$107.99", isFavorite: false, isFlat: false, imageSrc: imgMega },
  { emoji: "🌿", name: "Lash Lift", originalPrice: "$79.99", salePrice: "$71.99", isFavorite: false, isFlat: false, imageSrc: imgLashlift },
  { emoji: "🍃", name: "Laminado de Cejas", originalPrice: undefined, salePrice: "$50.00", isFavorite: false, isFlat: true, imageSrc: imgCejas },
];

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const slideVariants = {
  enter: { x: 60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -60, opacity: 0 },
};

const Quiz: React.FC = () => {
  const [step, setStep] = useState(1);
  const [screen, setScreen] = useState<Screen>("quiz");
  const [selectedService, setSelectedService] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  const phoneDigits = phone.replace(/\D/g, "");
  const isFormValid = name.trim().length >= 2 && phoneDigits.length === 10;
  const firstName = name.trim().split(" ")[0];

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName);
    setTimeout(() => setStep(2), 300);
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead");
    }
    setScreen("success");
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  };

  if (screen === "disqualified") {
    return (
      <PageWrapper>
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ padding: "60px 28px", minHeight: "calc(100dvh - 6px)" }}
        >
          <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>🙏</span>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#1a1a1a",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "12px",
            }}
          >
            ¡Gracias por tu interés!
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#757575",
              fontFamily: "Montserrat, sans-serif",
              maxWidth: "280px",
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            Por ahora solo atendemos en Thornton. Si en algún momento puedes llegar, aquí estaremos con gusto. 🤍
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (screen === "success") {
    return (
      <PageWrapper>
        <div style={{ padding: "40px 24px 48px" }}>
          {/* Animated checkmark */}
          <div className="flex justify-center" style={{ marginBottom: "20px" }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "#c2185b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ color: "white", fontSize: "30px", fontWeight: 700, lineHeight: 1 }}
              >
                ✓
              </motion.span>
            </motion.div>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "#1a1a1a",
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "8px",
            }}
          >
            ¡Listo, {firstName}! 🎉
          </h2>

          {/* Body */}
          <p
            style={{
              fontSize: "15px",
              color: "#757575",
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
              lineHeight: 1.6,
              marginBottom: "20px",
            }}
          >
            Recibimos tu solicitud. Te contactamos pronto para confirmar. 🤍
          </p>

          {/* Confirmation card */}
          <div
            style={{
              background: "#fff0f5",
              border: "1px solid #f8d7e3",
              borderLeft: "3px solid #c2185b",
              borderRadius: "12px",
              padding: "16px 18px",
              marginBottom: "16px",
            }}
          >
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 8px", fontFamily: "Montserrat, sans-serif" }}>
              💅 Servicio: <span style={{ color: "#c2185b" }}>{selectedService}</span>
            </p>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
              📱 Celular: {phone}
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/17203339999?text=Hola!%20Vi%20su%20oferta%20y%20me%20gustar%C3%ADa%20agendar%20mi%20cita%20para%20${encodeURIComponent(selectedService)}.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              height: "52px",
              borderRadius: "10px",
              background: "#25D366",
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              fontFamily: "Montserrat, sans-serif",
              marginBottom: "20px",
            }}
          >
            💬 Escríbenos por WhatsApp
          </a>

          {/* Address map card */}
          <div
            style={{
              background: "white",
              border: "1px solid #f0e4e8",
              borderRadius: "12px",
              padding: "14px 16px 14px 19px",
              borderLeft: "3px solid #c2185b",
              marginBottom: "24px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "#9e9e9e",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                margin: "0 0 4px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              📍 Nuestro Studio
            </p>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "#1a1a1a",
                margin: "0 0 2px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              2121 W 84th Ave
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#616161",
                margin: "0 0 10px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Thornton, CO 80260
            </p>
            <a
              href="https://maps.google.com/?q=2121+W+84th+Ave+Thornton+CO+80260"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#c2185b",
                fontWeight: 600,
                textDecoration: "none",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Ver en Google Maps →
            </a>
          </div>

          {/* FAQ divider + section */}
          <div
            style={{
              borderTop: "1.5px solid #f8d7e3",
              marginBottom: "20px",
            }}
          />
          <FaqAccordion />
        </div>
      </PageWrapper>
    );
  }

  // Quiz steps
  return (
    <PageWrapper>
      {/* Progress bar — top edge */}
      <div style={{ padding: "0 16px", paddingTop: "16px" }}>
        <ProgressBar step={step} />
      </div>

      {/* Animated step content */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ padding: "24px 24px 0" }}
          >
            {step === 1 && <Step1 selectedService={selectedService} onSelect={handleServiceSelect} />}
            {step === 2 && (
              <Step2
                onYes={() => setStep(3)}
                onNo={() => setScreen("disqualified")}
              />
            )}
            {step === 3 && (
              <Step3
                name={name}
                phone={phone}
                isFormValid={isFormValid}
                nameFocused={nameFocused}
                phoneFocused={phoneFocused}
                onNameChange={(v) => setName(v)}
                onPhoneChange={(v) => setPhone(formatPhone(v))}
                onNameFocus={() => setNameFocused(true)}
                onNameBlur={() => setNameFocused(false)}
                onPhoneFocus={() => setPhoneFocused(true)}
                onPhoneBlur={() => setPhoneFocused(false)}
                onSubmit={handleSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back link */}
      {step > 1 && (
        <div className="text-center" style={{ padding: "20px 0 28px" }}>
          <button
            onClick={goBack}
            style={{
              fontSize: "13px",
              color: "#757575",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
            }}
          >
            ← Regresar
          </button>
        </div>
      )}
      {step === 1 && <div style={{ height: "28px" }} />}
    </PageWrapper>
  );
};

/* ─── Page wrapper (same container logic as Landing) ─── */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ minHeight: "100dvh" }}
    className="flex items-start justify-center sm:items-center sm:py-8"
  >
    <div className="w-full" style={{ maxWidth: "480px" }}>
      <style>{`
        @media (min-width: 480px) {
          .quiz-card {
            border-radius: 20px !important;
            box-shadow: 0 8px 32px rgba(194,24,91,0.10) !important;
            min-height: auto !important;
          }
        }
      `}</style>
      <div className="quiz-card w-full" style={{ minHeight: "100dvh", background: "#fffaf9" }}>
        {children}
      </div>
    </div>
  </div>
);

/* ─── Step 1: Service Selection ─── */
const Step1: React.FC<{
  selectedService: string;
  onSelect: (name: string) => void;
}> = ({ selectedService, onSelect }) => (
  <div>
    <h2
      style={{
        fontSize: "22px",
        fontWeight: 700,
        color: "#1a1a1a",
        marginBottom: "6px",
        fontFamily: "Montserrat, sans-serif",
        lineHeight: 1.3,
      }}
    >
      ¿Qué servicio te interesa?
    </h2>
    <p style={{ fontSize: "13px", fontWeight: 500, color: "#444444", marginBottom: "10px", fontFamily: "Montserrat, sans-serif" }}>
      Elige el look que quieres lograr
    </p>
    {/* Discount pill */}
    <div style={{ marginBottom: "18px" }}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
          background: "#fff8e1",
          border: "1.5px solid #ffe082",
          borderRadius: "20px",
          padding: "5px 12px",
          fontSize: "12px",
          fontWeight: 700,
          color: "#7a5c00",
          fontFamily: "Montserrat, sans-serif",
          letterSpacing: "0.01em",
        }}
      >
        🏷️ 10% de descuento ya aplicado
      </span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {SERVICES.map((svc) => (
        <ServiceTile
          key={svc.name}
          emoji={svc.emoji}
          name={svc.name}
          originalPrice={svc.originalPrice}
          salePrice={svc.salePrice}
          isFlat={svc.isFlat}
          isFavorite={svc.isFavorite}
          isSelected={selectedService === svc.name}
          imageSrc={svc.imageSrc}
          onSelect={() => onSelect(svc.name)}
        />
      ))}
    </div>
  </div>
);

/* ─── Step 2: Location Check ─── */
const Step2: React.FC<{
  onYes: () => void;
  onNo: () => void;
}> = ({ onYes, onNo }) => (
  <div>
    <h2
      style={{
        fontSize: "22px",
        fontWeight: 700,
        color: "#1a1a1a",
        marginBottom: "6px",
        fontFamily: "Montserrat, sans-serif",
        lineHeight: 1.3,
      }}
    >
      ¿Puedes llegar a nuestro studio?
    </h2>
    <p style={{ fontSize: "13px", color: "#555555", marginBottom: "18px", fontFamily: "Montserrat, sans-serif" }}>
      Estamos en Thornton, CO — solo con cita previa
    </p>

    {/* Address info card — clean, info-only, no left accent, no map link */}
    <div
      style={{
        background: "white",
        border: "1.5px solid #f0d0da",
        borderRadius: "12px",
        padding: "14px 16px",
        marginBottom: "24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#444444",
          margin: 0,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        📍 2121 W 84th Ave, Thornton CO 80260
      </p>
    </div>

    {/* Side-by-side option cards — equal visual weight, neither looks pre-selected */}
    <div style={{ display: "flex", gap: "12px" }}>
      {/* YES card */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onYes}
        style={{
          flex: 1,
          height: "120px",
          borderRadius: "14px",
          background: "white",
          border: "1.5px solid #e0e0e0",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontFamily: "Montserrat, sans-serif",
          padding: "16px 8px",
        }}
      >
        <span style={{ fontSize: "32px", lineHeight: 1 }}>✅</span>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3, textAlign: "center" }}>
          Sí, puedo<br />llegar
        </span>
      </motion.button>

      {/* NO card */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onNo}
        style={{
          flex: 1,
          height: "120px",
          borderRadius: "14px",
          background: "white",
          border: "1.5px solid #e0e0e0",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          fontFamily: "Montserrat, sans-serif",
          padding: "16px 8px",
        }}
      >
        <span style={{ fontSize: "32px", lineHeight: 1 }}>🚗</span>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.3, textAlign: "center" }}>
          Muy lejos<br />para mí
        </span>
      </motion.button>
    </div>
  </div>
);

/* ─── Step 3: Contact Form ─── */
const Step3: React.FC<{
  name: string;
  phone: string;
  isFormValid: boolean;
  nameFocused: boolean;
  phoneFocused: boolean;
  onNameChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  onNameFocus: () => void;
  onNameBlur: () => void;
  onPhoneFocus: () => void;
  onPhoneBlur: () => void;
  onSubmit: () => void;
}> = ({
  name,
  phone,
  isFormValid,
  nameFocused,
  phoneFocused,
  onNameChange,
  onPhoneChange,
  onNameFocus,
  onNameBlur,
  onPhoneFocus,
  onPhoneBlur,
  onSubmit,
}) => {
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneComplete = phoneDigits.length === 10;

  return (
    <div>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "#1a1a1a",
          marginBottom: "6px",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.3,
        }}
      >
        ¡Ya casi! ¿Cómo te contactamos?
      </h2>
      <p style={{ fontSize: "13px", color: "#555555", marginBottom: "20px", fontFamily: "Montserrat, sans-serif" }}>
        Solo necesitamos tu nombre y tu número
      </p>

      {/* Name field */}
      <div style={{ marginBottom: "14px" }}>
        <label
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: 600,
            color: "#616161",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "6px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          TU NOMBRE
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onFocus={onNameFocus}
          onBlur={onNameBlur}
          placeholder="Ej. María García"
          style={{
            width: "100%",
            height: "56px",
            border: `1.5px solid ${nameFocused ? "#c2185b" : "#b0b0b0"}`,
            borderRadius: "8px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            padding: "0 14px",
            color: "#1a1a1a",
            outline: "none",
            background: nameFocused ? "white" : "#f5f5f5",
            boxSizing: "border-box",
            transition: "border-color 150ms ease, background 150ms ease",
          }}
        />
      </div>

      {/* Phone field */}
      <div style={{ marginBottom: "6px" }}>
        <label
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: 600,
            color: "#616161",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: "6px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          TU CELULAR
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            onFocus={onPhoneFocus}
            onBlur={onPhoneBlur}
            placeholder="(720) 000-0000"
            style={{
              width: "100%",
              height: "56px",
              border: `1.5px solid ${phoneFocused ? "#c2185b" : "#b0b0b0"}`,
              borderRadius: "8px",
              fontSize: "16px",
              fontFamily: "Montserrat, sans-serif",
              padding: "0 40px 0 14px",
              color: "#1a1a1a",
              outline: "none",
              background: phoneFocused ? "white" : "#f5f5f5",
              boxSizing: "border-box",
              transition: "border-color 150ms ease, background 150ms ease",
            }}
          />
          {phoneComplete && (
            <span
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#4caf50",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              ✓
            </span>
          )}
        </div>
      </div>

      {/* Trust micro-badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          margin: "14px 0 12px",
        }}
      >
        {[
          { icon: "🔒", label: "Seguro" },
          { icon: "⚡", label: "Respuesta rápida" },
          { icon: "🎁", label: "10% off" },
        ].map((badge, i, arr) => (
          <React.Fragment key={badge.label}>
          <span
              style={{
                fontSize: "11px",
                color: "#555555",
                fontFamily: "Montserrat, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              {badge.icon} {badge.label}
            </span>
            {i < arr.length - 1 && (
              <span
                style={{
                  margin: "0 8px",
                  color: "#e0e0e0",
                  fontSize: "12px",
                  lineHeight: 1,
                }}
              >
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={!isFormValid}
        style={{
          width: "100%",
          height: "56px",
          borderRadius: "10px",
          background: isFormValid ? "#c2185b" : "rgba(194,24,91,0.35)",
          color: "white",
          fontSize: "15px",
          fontWeight: 700,
          border: "none",
          cursor: isFormValid ? "pointer" : "not-allowed",
          fontFamily: "Montserrat, sans-serif",
          boxShadow: isFormValid ? "0 4px 14px rgba(194,24,91,0.28)" : "none",
          transition: "background 200ms ease, box-shadow 200ms ease",
          letterSpacing: "0.01em",
        }}
      >
        Agendar Mi Cita →
      </button>

      {/* Testimonial with stars */}
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#c2185b", lineHeight: 1 }}>
          ★★★★★
        </p>
        <p
          style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "#555555",
            margin: 0,
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.6,
          }}
        >
          "¡Cristina es la mejor! Las pestañas me duran semanas."
          <br />
          <span style={{ fontStyle: "normal" }}>— Sandra M., Thornton</span>
        </p>
      </div>
    </div>
  );
};

export default Quiz;
