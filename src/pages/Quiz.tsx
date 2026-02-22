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
import imgCejas from "@/assets/services/cejas.webp";

type Screen = "quiz" | "disqualified" | "success";

const SERVICES = [
  { emoji: "🌸", name: "Set Clásico", originalPrice: "$99.99", salePrice: "$89.99", isFavorite: false, isFlat: false, imageSrc: imgClasico, imagePosition: "center 40%", description: "Natural y bonito. Un pelo a la vez.", badgeText: "Precio Especial", badgeType: "discount" as const },
  { emoji: "✨", name: "Set Híbrido", originalPrice: "$149.99", salePrice: "$134.99", isFavorite: true, isFlat: false, imageSrc: imgHybrid, imagePosition: "center 40%", description: "Natural con más volumen. El favorito de nuestras clientas.", highlightBorder: true },
  { emoji: "💎", name: "Set de Volumen", originalPrice: "$179.99", salePrice: "$161.99", isFavorite: false, isFlat: false, imageSrc: imgVolumen, imagePosition: "center 40%", description: "Más lleno y dramático. Ojos grandes y hermosos.", badgeText: "Precio Especial", badgeType: "discount" as const },
  { emoji: "👑", name: "Mega Volumen", originalPrice: "$119.99", salePrice: "$107.99", isFavorite: false, isFlat: false, imageSrc: imgMega, imagePosition: "center 40%", description: "El look más llamativo. Para las que quieren brillar.", badgeText: "Precio Especial", badgeType: "discount" as const },
  { emoji: "🌿", name: "Lash Lift", originalPrice: "$79.99", salePrice: "$71.99", isFavorite: false, isFlat: false, imageSrc: imgLashlift, imagePosition: "center 60%", description: "Riza tus pestañas naturales. Sin extensiones.", badgeText: "Precio Especial", badgeType: "discount" as const },
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
    setTimeout(() => setStep(2), 400);
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
        <div style={{ padding: "0 16px", paddingTop: "16px" }}>
          <ProgressBar step={2} />
        </div>
        <div
          className="flex flex-col items-center justify-center text-center"
          style={{ padding: "60px 28px", minHeight: "calc(100dvh - 40px)" }}
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
      {/* Progress bar */}
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ padding: "24px 24px 0" }}
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

/* ─── Page wrapper ─── */
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
      <div className="quiz-card w-full" style={{ minHeight: "100dvh", background: `radial-gradient(ellipse 60% 50% at 10% 10%, rgba(194,24,91,0.06) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 90%, rgba(194,24,91,0.05) 0%, transparent 50%), repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(194,24,91,0.03) 18px, rgba(194,24,91,0.03) 19px), #fffaf9` }}>
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
        fontSize: "26px",
        fontWeight: 800,
        color: "#1a1a1a",
        marginBottom: "6px",
        fontFamily: "Montserrat, sans-serif",
        lineHeight: 1.3,
      }}
    >
      ¿Qué pestañas quieres?
    </h2>
    <p style={{ fontSize: "15px", fontWeight: 400, color: "#555", marginBottom: "18px", fontFamily: "Montserrat, sans-serif" }}>
      Precio especial de clienta nueva ya incluido 👇
    </p>
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
          imagePosition={svc.imagePosition}
          description={svc.description}
          badgeText={svc.badgeText}
          badgeType={svc.badgeType}
          highlightBorder={(svc as any).highlightBorder}
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
      Para agendar tu cita, necesitas poder visitarnos.
    </p>

    {/* Address box — soft rose */}
    <div
      style={{
        background: "#FFF0F5",
        border: "1px solid #F0C0D4",
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
          <p
            style={{
              fontSize: "13px",
              color: "#888",
              margin: 0,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Cerca del área de Westminster / Thornton
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
  </div>
);

/* ─── Step 3: Service Summary ─── */
const Step3Confirm: React.FC<{
  selectedService: string;
  onContinue: () => void;
}> = ({ selectedService, onContinue }) => {
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
        Esto es lo que escogiste:
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
            marginBottom: "16px",
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
                  fontSize: "14px",
                  color: "#999",
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
                ✅ Ahorras 10%
              </p>
            )}
          </div>
        </div>
      )}

      {/* Location reminder */}
      <p
        style={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#555",
          fontFamily: "Montserrat, sans-serif",
          marginBottom: "20px",
        }}
      >
        📍 Thornton, CO — 2121 W 84th Ave
      </p>

      {/* Trust bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {[
          "Satisfacción garantizada",
          "Pagas al terminar el servicio",
          "Te contactamos hoy mismo",
          "Cualquier pregunta, estamos aquí",
        ].map((text) => (
          <div
            key={text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "15px",
              fontWeight: 500,
              color: "#333",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <span style={{ color: "#2e7d32" }}>✅</span>
            {text}
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
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
          "No puedo creer lo bonitas que quedaron. Ya no uso ni rímel."
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
          — Karla T., Denver
        </p>
      </div>

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
        Recibir mi oferta →
      </button>
    </div>
  );
};

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
          fontSize: "24px",
          fontWeight: 800,
          color: "#1a1a1a",
          marginBottom: "6px",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.3,
        }}
      >
        ¿A dónde te mandamos tu descuento? 🎁
      </h2>
      <p style={{ fontSize: "15px", color: "#555", marginBottom: "20px", fontFamily: "Montserrat, sans-serif", lineHeight: 1.5 }}>
        Solo necesitamos tu nombre y celular. ¡Nosotras te escribimos!
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
          📱 Te mandamos tu descuento por mensaje. No spam, prometido.
        </p>
      </div>

      {/* Trust pill badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          margin: "14px 0 12px",
          flexWrap: "wrap",
        }}
      >
        {[
          { icon: "🔒", label: "Seguro", bg: "#F5F5F5" },
          { icon: "⚡", label: "Respuesta rápida", bg: "#FFF8E1" },
          { icon: "🎁", label: "10% de descuento", bg: "#FFF0F5" },
        ].map((badge) => (
          <span
            key={badge.label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "3px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#555",
              fontFamily: "Montserrat, sans-serif",
              whiteSpace: "nowrap",
              background: badge.bg,
              borderRadius: "99px",
              padding: "5px 10px",
            }}
          >
            {badge.icon} {badge.label}
          </span>
        ))}
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
        ¡Quiero mi descuento! 🎉
      </button>

      {/* SMS consent */}
      <p
        style={{
          fontSize: "11px",
          color: "#aaa",
          textAlign: "center",
          marginTop: "10px",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1.5,
        }}
      >
        Al enviar, aceptas recibir mensajes de texto de Divas Beauty Studio sobre tu cita. Puedes cancelar en cualquier momento.
      </p>

      {/* Testimonial with avatar */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#F0E0E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 700,
              color: "#c2185b",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            SM
          </div>
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
};

/* ─── Success / Confirmation Screen ─── */
const SuccessScreen: React.FC<{ firstName: string; selectedService: string }> = ({ firstName, selectedService }) => {
  const service = SERVICES.find((s) => s.name === selectedService);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "CompleteRegistration");
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ padding: "60px 28px", minHeight: "100dvh" }}
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
        Te vamos a escribir muy pronto con tu oferta especial 💛 Revisa tus mensajes.
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
          {service.name} — {service.salePrice} (10% OFF)
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
};

export default Quiz;
