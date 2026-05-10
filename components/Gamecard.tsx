"use client";

export default function GameCard({ game }: any) {
  return (
    <div
      className="game-card"
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        background: "rgba(255, 255, 255, 0.03)",
        color: "white",
        cursor: "pointer",
        position: "relative",
        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >

      <div style={cardGloss} />

      
      <img
        src={game.image}
        alt={game.title}
        style={{
          width: "100%",
          height: 420,
          objectFit: "cover",
          display: "block",
          transition: "transform 0.6s ease",
        }}
        className="game-image"
      />

  
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px",
          background: "linear-gradient(to top, rgba(10, 20, 40, 0.9) 0%, rgba(10, 20, 40, 0.6) 100%)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          borderTop: "1px solid rgba(255, 255, 255, 0.15)",
        }}
      >
        <h3 style={{ 
          margin: 0, 
          fontSize: 22, 
          fontWeight: 700, 
          color: "#00d2ff", 
          textShadow: "0 2px 4px rgba(0,0,0,0.3)" 
        }}>
          {game.title}
        </h3>

        <p
          style={{
            fontSize: 14,
            marginTop: 8,
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.5,
            fontWeight: 400,
          }}
        >
          {game.description}
        </p>
      </div>

      <style jsx>{`
        .game-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 210, 255, 0.2);
          border-color: rgba(0, 210, 255, 0.4);
        }
        .game-card:hover .game-image {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}

const cardGloss: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "60%",
  background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)",
  zIndex: 2,
  pointerEvents: "none",
};