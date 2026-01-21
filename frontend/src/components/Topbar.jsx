import { useNavigate } from "react-router-dom";

function Topbar({ onUploadClick }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "#020617",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* ✅ FIXED TEXT COLOR */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: "#e5e7eb", // ← THIS FIXES IT
        }}
      >
        My Drive
      </div>

      <input
        placeholder="Search in Drive"
        style={{
          width: 360,
          padding: "10px 16px",
          borderRadius: 999,
          border: "1px solid #1e293b",
          background: "#020617",
          color: "#e5e7eb",
          outline: "none",
        }}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={onUploadClick} style={primaryBtn}>
          + New
        </button>

        <button onClick={logout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}

const primaryBtn = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
  fontWeight: 500,
};

const logoutBtn = {
  padding: "10px 18px",
  borderRadius: 999,
  border: "1px solid #1e293b",
  background: "#020617",
  color: "#e5e7eb",
  cursor: "pointer",
};

export default Topbar;
