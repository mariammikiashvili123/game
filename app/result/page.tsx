"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";


import "swiper/swiper.css";
import "swiper/swiper-bundle.css";

import games from "@/data/games.json";

export default function ResultPage() {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("answers") || "[]");
    setAnswers(stored);
    setLoading(false);
  }, []);

  function restart() {
    localStorage.removeItem("answers");
    router.push("/quiz");
  }

  if (loading) return <div style={loadingStyle}><h1>Calculating...</h1></div>;

  // --- Scoring Logic ---
  const strongTags = ["cowboy", "space", "horror", "fantasy"];
  const userStrongTags = answers.filter((tag) => strongTags.includes(tag));
  const scored = games.map((game) => {
    let score = 0;
    game.tags.forEach((tag) => {
      if (answers.includes(tag)) score += 2;
      if (userStrongTags.includes(tag)) score += 4;
    });
    return { ...game, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const finalGames = scored.slice(0, 5);

  return (
    <div style={containerStyle}>
      {/* Dynamic Background Elements */}
      <div style={orbBlue} />
      <div style={orbGreen} />


      <div style={headerStyle}>
        <h1 style={titleStyle}>🎮 Your Top Picks</h1>
        <p style={{ opacity: 0.6, fontSize: "14px" }}>Hand-picked futuristic adventures</p>
        <button onClick={restart} className="retry-btn" style={retryButtonStyle}>
          🔄 Try Again
        </button>
      </div>

      <div style={swiperWrapper}>
        <Swiper
          modules={[EffectCoverflow, Navigation]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          style={{ width: "100%", paddingBottom: "50px" }}
        >
          {finalGames.map((game) => (
            <SwiperSlide key={game.id} style={{ width: "600px" }}>
              <div style={cardStyle}>
                <div style={imageWrapper}>
                  <img src={game.image} alt={game.title} style={imageStyle} />
                  <div style={glassShine} />
                </div>
                
                <div style={textOverlay}>
                  <h3 style={gameTitle}>{game.title}</h3>
                  <p style={gameDesc}>{game.description}</p>
                </div>
                {/* Reflection Detail */}
                <div style={reflectionStyle} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CUSTOM NAVIGATION BUTTONS */}
        <button onClick={() => swiperRef.current?.slidePrev()} className="nav-btn" style={{ ...navBtn, left: "10%" }}>◀</button>
        <button onClick={() => swiperRef.current?.slideNext()} className="nav-btn" style={{ ...navBtn, right: "10%" }}>▶</button>
      </div>

      <style jsx>{`
        .retry-btn {
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .retry-btn:hover {
          background: #7fbcf7 !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(94, 150, 206, 0.4);
        }
        .nav-btn {
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.05) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .nav-btn:hover {
          background: rgba(255,255,255,0.15) !important;
          color: #00d2ff;
          transform: translateY(-50%) scale(1.1);
        }
      `}</style>
    </div>
  );
}

// --- Styles ---

const containerStyle: React.CSSProperties = {
  height: "100vh", width: "100vw", overflow: "hidden",
  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
  background: "#050810", position: "relative",
};

const headerStyle: React.CSSProperties = {
  zIndex: 10, textAlign: "center", marginBottom: "30px"
};

const titleStyle: React.CSSProperties = {
  fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-1px", marginBottom: "5px"
};

const retryButtonStyle: React.CSSProperties = {
  marginTop: "15px", padding: "12px 24px", cursor: "pointer", borderRadius: "30px",
  background: "#5e96ce", color: "white", fontWeight: "bold", border: "none"
};

const swiperWrapper: React.CSSProperties = {
  position: "relative", width: "100%", maxWidth: "1200px"
};

const cardStyle: React.CSSProperties = {
  borderRadius: "24px", overflow: "hidden", background: "#161b30",
  boxShadow: "0 20px 60px rgba(0,0,0,0.5)", position: "relative",
  border: "1px solid rgba(255,255,255,0.1)",
};

const imageWrapper: React.CSSProperties = {
  position: "relative", height: "400px", width: "100%"
};

const imageStyle: React.CSSProperties = {
  width: "100%", height: "100%", objectFit: "cover"
};

const glassShine: React.CSSProperties = {
  position: "absolute", top: 0, left: 0, right: 0, height: "50%",
  background: "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%)",
  pointerEvents: "none",
};

const textOverlay: React.CSSProperties = {
  padding: "24px", background: "rgba(10, 15, 30, 0.8)",
  backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.05)"
};

const gameTitle: React.CSSProperties = { fontSize: "24px", margin: 0, color: "#00d2ff" };
const gameDesc: React.CSSProperties = { fontSize: "14px", opacity: 0.7, marginTop: "8px", lineHeight: "1.5" };

const reflectionStyle: React.CSSProperties = {
  position: "absolute", bottom: "-20%", left: "5%", right: "5%", height: "40px",
  background: "rgba(255,255,255,0.1)", filter: "blur(20px)", borderRadius: "50%", zIndex: -1
};

const navBtn: React.CSSProperties = {
  position: "fixed", top: "50%", transform: "translateY(-50%)",
  zIndex: 100, width: "60px", height: "60px", borderRadius: "50%",
  color: "white", cursor: "pointer", fontSize: "20px", display: "flex",
  alignItems: "center", justifyContent: "center"
};

const orbBlue: React.CSSProperties = {
  position: "absolute", top: "-10%", left: "10%", width: "500px", height: "500px",
  background: "radial-gradient(circle, #0072ff 0%, transparent 70%)", opacity: 0.15, filter: "blur(80px)"
};

const orbGreen: React.CSSProperties = {
  position: "absolute", bottom: "-10%", right: "10%", width: "500px", height: "500px",
  background: "radial-gradient(circle, #00f2fe 0%, transparent 70%)", opacity: 0.15, filter: "blur(80px)"
};

const loadingStyle: React.CSSProperties = {
  height: "100vh", background: "#050810", color: "white", 
  display: "flex", alignItems: "center", justifyContent: "center"
};