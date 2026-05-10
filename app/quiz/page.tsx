"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questions from "@/data/questions.json";

export default function QuizPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const current = questions[index];

  function handleAnswer(option: any) {
    const updated = [...answers, ...option.tags];
    if (index + 1 < questions.length) {
      setAnswers(updated);
      setIndex(index + 1);
    } else {
      localStorage.setItem("answers", JSON.stringify(updated));
      router.push("/result");
    }
  }

  if (!current) return <div style={{ color: "white", padding: 50 }}>Loading...</div>;

  return (
    <div style={containerStyle}>
      
      <div style={orbBlue} />
      <div style={orbGreen} />
      <div style={orbPurple} />

      <div style={glassCard}>
        <header style={{ marginBottom: 40 }}>
          <div style={badgeStyle}>
            Question {index + 1} of {questions.length}
          </div>
          <h1 style={questionTextStyle}>{current.question}</h1>
        </header>

        <div style={buttonGroupStyle}>
          {current.answers.map((option: any) => (
            <button
              key={option.text}
              onClick={() => handleAnswer(option)}
              className="aero-button"
              style={buttonStyle}
            >
              <span style={buttonText}>{option.text}</span>
            
              <div style={buttonShine} />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .aero-button {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .aero-button:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: #00d2ff !important;
          box-shadow: 0 0 20px rgba(0, 210, 255, 0.4), 
                      inset 0 0 15px rgba(255, 255, 255, 0.1);
          transform: scale(1.02);
        }
        .aero-button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}


const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#040712", 
  fontFamily: "'Segoe UI', Roboto, Helvetica, sans-serif",
  position: "relative",
  overflow: "hidden",
};

const glassCard: React.CSSProperties = {
  zIndex: 10,
  width: "90%",
  maxWidth: "500px",
  padding: "40px",
  borderRadius: "30px",
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(25px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  textAlign: "center",
};

const orbBlue: React.CSSProperties = {
  position: "absolute",
  top: "10%",
  left: "5%",
  width: "400px",
  height: "400px",
  background: "radial-gradient(circle, #0072ff 0%, transparent 70%)",
  opacity: 0.4,
  filter: "blur(60px)",
};

const orbGreen: React.CSSProperties = {
  position: "absolute",
  bottom: "5%",
  right: "5%",
  width: "500px",
  height: "500px",
  background: "radial-gradient(circle, #00f2fe 0%, transparent 70%)",
  opacity: 0.3,
  filter: "blur(80px)",
};

const orbPurple: React.CSSProperties = {
  position: "absolute",
  top: "40%",
  right: "20%",
  width: "300px",
  height: "300px",
  background: "radial-gradient(circle, #7000ff 0%, transparent 70%)",
  opacity: 0.15,
  filter: "blur(50px)",
};

const badgeStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 16px",
  borderRadius: "20px",
  background: "linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)",
  fontSize: "12px",
  fontWeight: "bold",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginBottom: "20px",
  boxShadow: "0 4px 15px rgba(0, 210, 255, 0.3)",
};

const questionTextStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 600,
  color: "white",
  lineHeight: 1.2,
};

const buttonGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const buttonStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderRadius: "15px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(255, 255, 255, 0.05)",
  color: "white",
  fontSize: "17px",
  fontWeight: 500,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const buttonShine: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  height: "40%",
  background: "linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%)",
  pointerEvents: "none",
};

const buttonText: React.CSSProperties = {
  zIndex: 2,
};