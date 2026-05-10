"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div style={containerStyle}>

      <div style={backgroundWrapper} />


      <div style={aeroOverlay} />


      <div style={glassPanelStyle} className="glass-panel">


        <div style={specularHighlight} />

        <div style={{ position: "relative", zIndex: 3 }}>
          <h1 style={logoStyle}>
            GameFinder
          </h1>

          <p style={subtitleStyle}>
            Discover games that match your personality.
            <br />
            Answer a few questions and find your next world.
          </p>

          <button
            onClick={() => router.push("/quiz")}
            className="hero-button"
            style={heroButtonStyle}
          >
            Start Your Journey 🚀
            <div className="button-shine" />
          </button>
        </div>

        <div style={bottomGlow} />
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-button {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .hero-button:hover {
          transform: scale(1.08) translateY(-3px);
          box-shadow: 0 15px 30px rgba(79, 70, 229, 0.5), 
                      0 0 10px rgba(0, 210, 255, 0.5);
          filter: brightness(1.1);
        }

        .button-shine {
          position: absolute;
          top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: 0.5s;
        }

        .hero-button:hover .button-shine {
          left: 150%;
        }

        .glass-panel {
           animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}


const containerStyle: React.CSSProperties = {
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#030712",
  color: "white",
};

const backgroundWrapper: React.CSSProperties = {
  position: "absolute",
  top: 0, left: 0,
  width: "200%", height: "100%",
  backgroundImage: "url(https://wallpapercave.com/wp/wp10389836.jpg)",
  backgroundSize: "auto 100%",
  backgroundRepeat: "repeat-x",
  animation: "slide 120s linear infinite",
  opacity: 0.6,
  filter: "saturate(1.2) contrast(1.1)",
};

const aeroOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.15), transparent 80%)",
  pointerEvents: "none",
};

const glassPanelStyle: React.CSSProperties = {
  position: "relative",
  zIndex: 10,
  textAlign: "center",
  maxWidth: "580px",
  padding: "60px 40px",
  borderRadius: "35px",
  background: "rgba(255, 255, 255, 0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.05)",
};

const specularHighlight: React.CSSProperties = {
  position: "absolute",
  top: "0px", left: "10%", right: "10%",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
  zIndex: 4,
};

const logoStyle: React.CSSProperties = {
  fontSize: "3.5rem",
  fontWeight: "900",
  marginBottom: "15px",
  background: "linear-gradient(to bottom, #fff 40%, #a5b4fc 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "-2px",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  opacity: 0.8,
  marginBottom: "40px",
  lineHeight: "1.6",
  color: "#e2e8f0",
};

const heroButtonStyle: React.CSSProperties = {
  padding: "18px 45px",
  fontSize: "18px",
  fontWeight: "700",
  borderRadius: "100px",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg, #00d2ff, #3a7bd5)", // Bright Aqua-Blue
  color: "white",
  boxShadow: "0 8px 25px rgba(0, 210, 255, 0.3)",
};

const bottomGlow: React.CSSProperties = {
  position: "absolute",
  bottom: "-30px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "80%",
  height: "60px",
  background: "radial-gradient(ellipse at center, rgba(0, 210, 255, 0.2), transparent 70%)",
  zIndex: -1,
};