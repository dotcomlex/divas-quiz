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

type Screen = "quiz" | "success";

const SERVICES = [
  { emoji: "🌸", name: "Set Clásico", originalPrice: "$99.99", salePrice: "$89.99", isFavorite: false, isFlat: false, imageSrc: imgClasico, imagePosition: "center 35%", description: "Natural y bonito. Un pelo a la vez.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "✨", name: "Set Híbrido", originalPrice: "$149.99", salePrice: "$134.99", isFavorite: false, isFlat: false, imageSrc: imgHybrid, imagePosition: "center 50%", description: "Natural con más volumen. El favorito de nuestras clientas.", highlightBorder: true, badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "💎", name: "Volumen", originalPrice: "$179.99", salePrice: "$161.99", isFavorite: false, isFlat: false, imageSrc: imgVolumen, imagePosition: "center 35%", description: "Más lleno y dramático. Ojos grandes y hermosos.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "👑", name: "Mega Volumen", originalPrice: "$119.99", salePrice: "$107.99", isFavorite: false, isFlat: false, imageSrc: imgMega, imagePosition: "center 35%", description: "El look más llamativo. Para las que quieren brillar.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "🌿", name: "Lash Lift", originalPrice: "$79.99", salePrice: "$71.99", isFavorite: false, isFlat: false, imageSrc: imgLashlift, imagePosition: "center 55%", description: "Riza tus pestañas naturales. Sin extensiones.", badgeText: "Incluye 10% desc.", badgeType: "discount" as const },
  { emoji: "🍃", name: "Laminado de Cejas", originalPrice: undefined, salePrice: "$49.99", isFavorite: false, isFlat: true, imageSrc: imgCejas, imagePosition: "center 40%", description: "Cejas peinadas y definidas. Sin maquillaje.", badgeText: "Precio Fijo", badgeType: "flat" as const },
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
    setTimeout(() => setStep(2), 250); // Go straight to contact form
  };

  const handleSubmit = () => {
    if (!isFormValid) return;
    const service = SERVICES.find((s) => s.name === selectedService);

    // Send to webhook (fire-and-forget)
    fetch("https://services.leadconnectorhq.com/hooks/4cQKcpdWiqodiHPVS5wT/webhook-trigger/356f12b2-f8c0-4e49-960b-d07dfa15f4b9", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        phone: phoneDigits,
        service: selectedService,
        price: service?.salePrice ?? "",
      }),
    }).catch(() => {});

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
  };

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
      <div className="quiz-card w-full" style={{ height: "100dvh", display: "flex", flexDirection: "column", background: "#fffaf9" }}>
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
        marginBottom: "10px",
        fontFamily: "Montserrat, sans-serif",
        lineHeight: 1.3,
      }}
    >
      Elige Tu Servicio ✨
    </h2>
    <div
      style={{
        background: "hsl(340, 92%, 95%)",
        borderRadius: "10px",
        padding: "8px 14px",
        marginBottom: "14px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "13px", fontWeight: 600, color: "hsl(336, 78%, 43%)", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
        🎉 10% de descuento este mes en todos los servicios
      </p>
    </div>
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


/* ─── Step 2: Contact Form ─── */
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
      <div style={{ textAlign: "center", marginTop: "14px" }}>
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
          {service.name} — {service.salePrice} (incluye 10% de descuento)
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
