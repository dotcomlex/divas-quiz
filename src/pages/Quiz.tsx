import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import ServiceTile from "@/components/ServiceTile";
import logoSrc from "@/assets/logo.png";
import imgHybrid from "@/assets/services/hybrid.webp";
import imgClasico from "@/assets/services/clasico.webp";
import imgVolumen from "@/assets/services/volumen.webp";
import imgMega from "@/assets/services/mega.webp";
import imgLashlift from "@/assets/services/lashlift.webp";
import avatarSandra from "@/assets/avatar-sandra.webp";
import imgCejas from "@/assets/services/cejas.webp";

type Screen = "quiz" | "disqualified" | "success";

const SERVICES = [
  { emoji: "🌸", name: "Set Clásico", originalPrice: "$99.99", salePrice: "$89.99", isFavorite: false, isFlat: false, imageSrc: imgClasico, imagePosition: "center 40%", description: "Natural y bonito. Un pelo a la vez.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "✨", name: "Set Híbrido", originalPrice: "$149.99", salePrice: "$134.99", isFavorite: true, isFlat: false, imageSrc: imgHybrid, imagePosition: "center 40%", description: "Natural con más volumen. El favorito de nuestras clientas.", highlightBorder: true, badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "💎", name: "Volumen", originalPrice: "$179.99", salePrice: "$161.99", isFavorite: false, isFlat: false, imageSrc: imgVolumen, imagePosition: "center 40%", description: "Más lleno y dramático. Ojos grandes y hermosos.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "👑", name: "Mega Volumen", originalPrice: "$119.99", salePrice: "$107.99", isFavorite: false, isFlat: false, imageSrc: imgMega, imagePosition: "center 40%", description: "El look más llamativo. Para las que quieren brillar.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "🌿", name: "Lash Lift", originalPrice: "$79.99", salePrice: "$71.99", isFavorite: false, isFlat: false, imageSrc: imgLashlift, imagePosition: "center 60%", description: "Riza tus pestañas naturales. Sin extensiones.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "🍃", name: "Laminado de Cejas", originalPrice: undefined, salePrice: "$49.99", isFavorite: false, isFlat: true, imageSrc: imgCejas, imagePosition: "center 25%", description: "Cejas peinadas y definidas. Sin maquillaje.", badgeText: "Precio Fijo", badgeType: "flat" as const },
];

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const slideVariants = {
  enter: { y: 16, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -16, opacity: 0 },
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
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "CustomizeProduct", { content_name: serviceName });
    }
    setTimeout(() => setStep(2), 250);
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    const service = SERVICES.find((s) => s.name === selectedService);
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: selectedService,
        value: service ? parseFloat(service.salePrice.replace("$", "")) : 0,
        currency: "USD",
      });
    }
    setScreen("success");
  };

  const goBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  };

  if (screen === "disqualified") {
    return (
      <PageWrapper>
        <div style={{ padding: "0 16px", paddingTop: "16px", flexShrink: 0 }}>
          <ProgressBar step={2} />
        </div>
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ flex: 1, padding: "60px 28px", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
        >
          <span style={{ fontSize: "40px", display: "block", marginBottom: "16px" }}>💛</span>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 800,
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
              color: "#555",
              fontFamily: "Montserrat, sans-serif",
              maxWidth: "280px",
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            Nuestro estudio está en Thornton. Por el momento solo atendemos ahí. ¡Esperamos verte pronto!
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (screen === "success") {
    return (
      <PageWrapper>
        <SuccessScreen firstName={firstName} selectedService={selectedService} />
      </PageWrapper>
    );
  }

  // Quiz steps
  return (
    <PageWrapper>
      {/* Progress bar — fixed top */}
      <div style={{ padding: "0 16px", paddingTop: "16px", flexShrink: 0 }}>
        <ProgressBar step={step} />
      </div>

      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", position: "relative" }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ padding: "24px 24px 0", willChange: "transform" }}
          >
            {step === 1 && <Step1 selectedService={selectedService} onSelect={handleServiceSelect} />}
            {step === 2 && (
              <Step2
                onYes={() => {
                  if (typeof window !== "undefined" && (window as any).fbq) {
                    (window as any).fbq("trackCustom", "fb_quiz_qualified");
                  }
                  setStep(3);
                }}
                onNo={() => {
                  if (typeof window !== "undefined" && (window as any).fbq) {
                    (window as any).fbq("trackCustom", "fb_quiz_disqualified");
                  }
                  setScreen("disqualified");
                }}
              />
            )}
            {step === 3 && (
              <Step3Confirm
                selectedService={selectedService}
                onContinue={() => setStep(4)}
              />
            )}
            {step === 4 && (
              <Step4Contact
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

      {/* Back button — fixed bottom */}
      <div style={{ flexShrink: 0 }}>
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
      </div>
    </PageWrapper>
  );
};

/* ─── Page wrapper ─── */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{ height: "100dvh", overflow: "hidden" }}
    className="flex items-start justify-center sm:items-center sm:py-8"
  >
    <div className="w-full" style={{ maxWidth: "480px", height: "100dvh" }}>
      <style>{`
        @media (min-width: 480px) {
          .quiz-card {
            border-radius: 20px !important;
            box-shadow: 0 8px 32px rgba(194,24,91,0.10) !important;
            height: auto !important;
            max-height: 90dvh !important;
          }
          .quiz-outer {
            height: auto !important;
          }
        }
      `}</style>
      <div className="quiz-card w-full" style={{ height: "100dvh", display: "flex", flexDirection: "column", background: `radial-gradient(ellipse 60% 50% at 10% 10%, rgba(194,24,91,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(194,24,91,0.05) 0%, transparent 50%), repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(194,24,91,0.03) 18px, rgba(194,24,91,0.03) 19px), #fffaf9` }}>
        {children}
      </div>
    </div>
  </div>
);

/* ─── Step 1: Service Selection ─── */
const Step1: React.FC<{
  selectedService: string;
  onSelect: (name: string) => void;
}> = React.memo(({ selectedService, onSelect }) => (
  <div>
    <h2
      style={{
        fontSize: "26px",
        fontWeight: 800,
        color: "#1a1a1a",
        marginBottom: "6px",
        fontFamily: "Montserrat, sans-serif",
        lineHeight: 1.3,
      }}
    >
      Elige tu Servicio
    </h2>
    <p style={{ fontSize: "15px", fontWeight: 400, color: "#555", marginBottom: "18px", fontFamily: "Montserrat, sans-serif" }}>
      Todos los precios ya incluyen tu 10% de descuento solo por este mes 👇
    </p>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
      {SERVICES.map((svc, i) => (
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
          imagePosition={svc.imagePosition}
          description={svc.description}
          badgeText={svc.badgeText}
          badgeType={svc.badgeType}
          highlightBorder={(svc as any).highlightBorder}
          loading={i < 2 ? "eager" : "lazy"}
          fetchPriority={i < 2 ? "high" : "auto"}
          onSelect={() => onSelect(svc.name)}
        />
      ))}
    </div>
  </div>
));

/* ─── Step 2: Location Check ─── */
const Step2: React.FC<{
  onYes: () => void;
  onNo: () => void;
}> = React.memo(({ onYes, onNo }) => (
  <div>
    <h2
      style={{
        fontSize: "28px",
        fontWeight: 800,
        color: "#1a1a1a",
        marginBottom: "6px",
        fontFamily: "Montserrat, sans-serif",
        lineHeight: 1.3,
      }}
    >
      ¡Casi lista! 🎉
    </h2>
    <p style={{ fontSize: "15px", color: "#555", marginBottom: "18px", fontFamily: "Montserrat, sans-serif" }}>
      Antes de continuar, por favor confirma que puedes llegar a nuestro local.
    </p>

    {/* Address box — soft rose */}
    <div
      style={{
        background: "#FFFDE7",
        border: "1px solid #F5C842",
        borderRadius: "12px",
        padding: "16px 18px",
        marginBottom: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
        <span style={{ fontSize: "18px", lineHeight: 1 }}>📍</span>
        <div>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "#333",
              margin: "0 0 4px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            2121 W 84th Ave, Thornton CO 80260
          </p>
        </div>
      </div>
    </div>

    {/* Stacked vertical buttons */}
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* YES */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onYes}
        style={{
          width: "100%",
          borderRadius: "14px",
          background: "white",
          border: "2px solid #E0E0E0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontFamily: "Montserrat, sans-serif",
          padding: "18px",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "28px", lineHeight: 1 }}>✅</span>
        <div>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", display: "block" }}>
            Sí, puedo ir
          </span>
          <span style={{ fontSize: "13px", fontWeight: 400, color: "#888", display: "block", marginTop: "2px" }}>
            Tengo cómo llegar
          </span>
        </div>
      </motion.button>

      {/* NO */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNo}
        style={{
          width: "100%",
          borderRadius: "14px",
          background: "white",
          border: "2px solid #E0E0E0",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontFamily: "Montserrat, sans-serif",
          padding: "18px",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "28px", lineHeight: 1 }}>🚗</span>
        <div>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1a1a1a", display: "block" }}>
            Me queda muy lejos
          </span>
          <span style={{ fontSize: "13px", fontWeight: 400, color: "#888", display: "block", marginTop: "2px" }}>
            No podría llegar
          </span>
        </div>
      </motion.button>
    </div>

    <p style={{ fontSize: "13px", color: "#999", fontStyle: "italic", textAlign: "center", marginTop: "16px", fontFamily: "Montserrat, sans-serif", lineHeight: 1.5 }}>
      Para respetar tu tiempo y el nuestro, asegúrate de que puedes llegar a nuestro local antes de continuar.
    </p>
  </div>
));

/* ─── Step 3: Service Summary ─── */
const Step3Confirm: React.FC<{
  selectedService: string;
  onContinue: () => void;
}> = React.memo(({ selectedService, onContinue }) => {
  const service = SERVICES.find((s) => s.name === selectedService);
  return (
    <div>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 800,
          color: "#1a1a1a",
          marginBottom: "20px",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.3,
        }}
      >
        Confirma tu servicio:
      </h2>

      {/* Service summary card */}
      {service && (
        <div
          style={{
            display: "flex",
            border: "1.5px solid #F0E0E8",
            borderRadius: "14px",
            overflow: "hidden",
            background: "white",
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
            marginBottom: "24px",
          }}
        >
          {/* Thumbnail */}
          <div style={{ width: "80px", height: "80px", flexShrink: 0 }}>
            {service.imageSrc ? (
              <img
                src={service.imageSrc}
                alt={service.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px 0 0 10px" }}
              />
            ) : (
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #fce4ec 0%, #fdf6f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                {service.emoji}
              </div>
            )}
          </div>
          {/* Info */}
          <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#1a1a1a",
                margin: "0 0 2px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {service.name}
            </p>
            {!service.isFlat && service.originalPrice && (
              <p
                style={{
                  fontSize: "15px",
                  color: "#888",
                  textDecoration: "line-through",
                  margin: "0 0 2px",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {service.originalPrice}
              </p>
            )}
            <p
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#c2185b",
                margin: "0 0 2px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {service.salePrice}
            </p>
            {!service.isFlat && (
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#2e7d32",
                  margin: 0,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                ✅ 10% de descuento este mes
              </p>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onContinue}
        style={{
          width: "100%",
          height: "56px",
          borderRadius: "14px",
          background: "#c2185b",
          color: "white",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          fontFamily: "Montserrat, sans-serif",
          boxShadow: "0 4px 16px rgba(194,24,91,0.25)",
          letterSpacing: "0.01em",
        }}
      >
        Continuar →
      </button>
    </div>
  );
});

/* ─── Step 4: Contact Form ─── */
const Step4Contact: React.FC<{
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
}> = React.memo(({
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
          fontSize: "24px",
          fontWeight: 800,
          color: "#1a1a1a",
          marginBottom: "6px",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.3,
        }}
      >
        ¡Ya casi! ¿Cómo te contactamos?
      </h2>
      <p style={{ fontSize: "15px", color: "#555", marginBottom: "20px", fontFamily: "Montserrat, sans-serif", lineHeight: 1.5 }}>
        Déjanos tu nombre y celular para agendar tu cita.
      </p>

      {/* Name field */}
      <div style={{ marginBottom: "14px" }}>
        <label
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: 700,
            color: "#888",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "6px",
            fontFamily: "Montserrat, sans-serif",
          }}
        >
          TU NOMBRE
        </label>
        <input
          type="text"
          autoComplete="given-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onFocus={onNameFocus}
          onBlur={onNameBlur}
          placeholder="Ej. María García"
          style={{
            width: "100%",
            height: "52px",
            border: nameFocused ? "2px solid #c2185b" : "1px solid #E0E0E0",
            borderRadius: "12px",
            fontSize: "16px",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            padding: "0 14px",
            color: "#1a1a1a",
            outline: "none",
            background: "white",
            boxSizing: "border-box",
            transition: "border-color 150ms ease",
          }}
        />
      </div>

      {/* Phone field */}
      <div style={{ marginBottom: "6px" }}>
        <label
          style={{
            display: "block",
            fontSize: "11px",
            fontWeight: 700,
            color: "#888",
            letterSpacing: "0.08em",
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
            autoComplete="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            onFocus={onPhoneFocus}
            onBlur={onPhoneBlur}
            placeholder="(720) 000-0000"
            style={{
              width: "100%",
              height: "52px",
              border: phoneFocused ? "2px solid #c2185b" : "1px solid #E0E0E0",
              borderRadius: "12px",
              fontSize: "16px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              padding: "0 40px 0 14px",
              color: "#1a1a1a",
              outline: "none",
              background: "white",
              boxSizing: "border-box",
              transition: "border-color 150ms ease",
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
        {/* Phone microcopy */}
        <p
          style={{
            fontSize: "12px",
            color: "#888",
            margin: "6px 0 0",
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.4,
          }}
        >
          📱 Te escribimos por mensaje para confirmar tu cita. No spam, prometido.
        </p>
      </div>


      {/* Submit button */}
      <button
        onClick={onSubmit}
        disabled={!isFormValid}
        style={{
          width: "100%",
          height: "56px",
          borderRadius: "14px",
          background: "#c2185b",
          color: "white",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: isFormValid ? "pointer" : "not-allowed",
          fontFamily: "Montserrat, sans-serif",
          boxShadow: isFormValid ? "0 4px 16px rgba(194,24,91,0.25)" : "none",
          opacity: isFormValid ? 1 : 0.6,
          transition: "opacity 200ms ease, box-shadow 200ms ease",
          letterSpacing: "0.01em",
        }}
      >
        Enviar mi info →
      </button>


      {/* Testimonial with avatar */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <img
            src={avatarSandra}
            alt="Sandra M."
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </div>
        <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#f5a623", lineHeight: 1 }}>
          ⭐⭐⭐⭐⭐
        </p>
        <p
          style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "#555",
            margin: "0 0 4px",
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.6,
          }}
        >
          "¡Divas Beauty es increíble! Las pestañas me duran semanas."
        </p>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#888",
            margin: 0,
            fontFamily: "Montserrat, sans-serif",
            fontStyle: "normal",
          }}
        >
          — Sandra M., Thornton
        </p>
      </div>
    </div>
  );
});

/* ─── Success / Confirmation Screen ─── */
const SuccessScreen: React.FC<{ firstName: string; selectedService: string }> = React.memo(({ firstName, selectedService }) => {
  const service = SERVICES.find((s) => s.name === selectedService);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "CompleteRegistration");
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ flex: 1, padding: "60px 28px", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
    >
      <span style={{ fontSize: "48px", display: "block", marginBottom: "16px" }}>🎉</span>
      <h2
        style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "#1a1a1a",
          fontFamily: "Montserrat, sans-serif",
          marginBottom: "12px",
        }}
      >
        ¡Listo, {firstName}!
      </h2>
      <p
        style={{
          fontSize: "16px",
          color: "#555",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.6,
          marginBottom: "16px",
          maxWidth: "320px",
        }}
      >
        Te vamos a escribir muy pronto para agendar tu cita 💛 Revisa tus mensajes.
      </p>

      {/* Service pill badge */}
      {service && (
        <span
          style={{
            display: "inline-block",
            background: "#FFF0F5",
            border: "1px solid #F0C0D4",
            borderRadius: "99px",
            padding: "8px 18px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#c2185b",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "16px",
          }}
        >
          {service.name} — {service.salePrice} (10% de descuento este mes)
        </span>
      )}

      {/* Location */}
      <p
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#888",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        📍 Thornton, CO — 2121 W 84th Ave
      </p>
    </div>
  );
});

export default Quiz;
