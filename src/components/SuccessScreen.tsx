import React, { useEffect } from "react";
import avatarAna from "@/assets/avatar-ana.webp";
import avatarJessica from "@/assets/avatar-jessica.webp";
import avatarLucia from "@/assets/avatar-lucia.webp";
import avatarSandra from "@/assets/avatar-sandra.webp";

interface ServiceInfo {
  name: string;
  salePrice: string;
}

interface SuccessScreenProps {
  firstName: string;
  selectedService: string;
  service?: ServiceInfo;
}

const REVIEWS = [
  {
    name: "Sandra M.",
    location: "Aurora, CO",
    avatar: avatarSandra,
    text: "Increíble experiencia en Divas Beauty. Mis pestañas quedaron perfectas y el ambiente es súper acogedor. ¡Ya agendé mi siguiente cita!",
  },
  {
    name: "Ana R.",
    location: "Lakewood, CO",
    avatar: avatarAna,
    text: "Llevo 6 meses viniendo a Divas Beauty y cada vez quedo más enamorada. El trabajo es muy profesional y duran muchísimo. Las recomiendo al 100%.",
  },
  {
    name: "Jessica L.",
    location: "Thornton, CO",
    avatar: avatarJessica,
    text: "Tenía miedo de hacerme extensiones por primera vez pero me explicaron todo con mucha paciencia. El resultado fue hermoso, me siento otra persona.",
  },
  {
    name: "Lucía G.",
    location: "Westminster, CO",
    avatar: avatarLucia,
    text: "Las mejores pestañas que he tenido en Colorado. Divas Beauty es el único lugar donde confío mis ojos. El servicio es rápido y el precio vale cada centavo.",
  },
  {
    name: "Mariana D.",
    location: "Arvada, CO",
    avatar: avatarAna,
    text: "Mi amiga me recomendó Divas Beauty y no me arrepiento. El set híbrido me queda espectacular y recibo cumplidos todos los días. ¡Son las mejores!",
  },
];

const SuccessScreen: React.FC<SuccessScreenProps> = React.memo(({ firstName, selectedService, service }) => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "CompleteRegistration");
    }
  }, []);

  return (
    <div
      className="flex flex-col items-center text-center"
      style={{ flex: 1, padding: "32px 20px 24px", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
    >
      {/* Celebration header */}
      <span style={{ fontSize: "48px", display: "block", marginBottom: "12px" }}>🎉</span>
      <h2
        style={{
          fontSize: "26px",
          fontWeight: 800,
          color: "#1a1a1a",
          fontFamily: "Montserrat, sans-serif",
          marginBottom: "10px",
        }}
      >
        ¡Listo, {firstName}!
      </h2>

      {/* Service badge */}
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
            marginBottom: "20px",
          }}
        >
          {service.name} — {service.salePrice} (incluye 10% de descuento)
        </span>
      )}

      {/* Next Steps */}
      <div
        style={{
          width: "100%",
          background: "#ffffff",
          border: "1px solid #f0e0e6",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "16px",
          textAlign: "left",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "14px",
          }}
        >
          📋 Pasos Siguientes
        </p>
        {[
          { num: "1", emoji: "💬", text: "Te vamos a enviar un mensaje de texto muy pronto" },
          { num: "2", emoji: "✨", text: "Vamos a repasar los detalles de tu servicio" },
          { num: "3", emoji: "📅", text: "Juntas seleccionamos el día y hora perfecta para tu cita" },
        ].map((s) => (
          <div key={s.num} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
            <span
              style={{
                flexShrink: 0,
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#c2185b",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {s.num}
            </span>
            <p
              style={{
                fontSize: "14px",
                color: "#444",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {s.emoji} {s.text}
            </p>
          </div>
        ))}
      </div>

      {/* Address card */}
      <div
        style={{
          width: "100%",
          background: "#FFFDE7",
          border: "1.5px solid #F5C842",
          borderRadius: "14px",
          padding: "16px 18px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "4px",
          }}
        >
          📍 Divas Beauty Studio
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "#555",
            fontFamily: "Montserrat, sans-serif",
            margin: 0,
          }}
        >
          2121 W 84th Ave, Federal Heights, CO
        </p>
      </div>

      {/* Reviews strip */}
      <div style={{ width: "100%", textAlign: "left", marginBottom: "8px" }}>
        <p
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "Montserrat, sans-serif",
            marginBottom: "12px",
          }}
        >
          💛 Lo que dicen nuestras clientas
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "8px",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              style={{
                flexShrink: 0,
                width: "260px",
                background: "#ffffff",
                border: "1px solid #f0e0e6",
                borderRadius: "14px",
                padding: "16px",
                scrollSnapAlign: "start",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <img
                  src={r.avatar}
                  alt={r.name}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                  loading="lazy"
                />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#1a1a1a", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
                    {r.name}
                  </p>
                  <p style={{ fontSize: "11px", color: "#888", margin: 0, fontFamily: "Montserrat, sans-serif" }}>
                    {r.location}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "#F5C842", margin: "0 0 8px", letterSpacing: "1px" }}>★★★★★</p>
              <p style={{ fontSize: "13px", color: "#555", fontFamily: "Montserrat, sans-serif", lineHeight: 1.5, margin: 0 }}>
                "{r.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

SuccessScreen.displayName = "SuccessScreen";
export default SuccessScreen;
