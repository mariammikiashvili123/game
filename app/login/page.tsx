"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  // Auto-login if saved
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      router.push("/dashboard"); // change to your page
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // fake validation (replace with real API call)
    if (!email || !password) {
      setError("Fill all fields");
      return;
    }

    const userData = {
      email,
      token: "fake-token-123",
    };

    if (remember) {
      localStorage.setItem("user", JSON.stringify(userData));
    }

    router.push("/dashboard"); // redirect after login
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "20px",
    background: "#222",
    borderRadius: "10px",
    width: "300px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "10px",
    background: "white",
    color: "black",
    border: "none",
    cursor: "pointer",
  },
  checkbox: {
    fontSize: "14px",
  },
};