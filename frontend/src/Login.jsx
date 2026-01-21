import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div style={page}>
      <div style={card}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>☁️</div>

        <h2 style={{ marginBottom: 6 }}>Sign in</h2>
        <p style={{ marginBottom: 24, color: "#94a3b8" }}>
          Continue to Cloud Drive
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={login} style={btn}>
          Next
        </button>

        <p style={{ marginTop: 20, fontSize: 12, color: "#64748b" }}>
          Secure cloud-based file storage
        </p>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#020617",
};

const card = {
  width: 360,
  padding: "32px 28px",
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: 16,
  textAlign: "center",
  color: "#e5e7eb",
};

const input = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: 14,
  borderRadius: 8,
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#e5e7eb",
  outline: "none",
};

const btn = {
  width: "100%",
  padding: "12px",
  borderRadius: 999,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
};

export default Login;
