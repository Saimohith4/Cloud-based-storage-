function Sidebar({ view, setView }) {
  return (
    <div style={sidebar}>
      <div style={logo}>☁ Cloud Storage</div>

      <MenuItem
        icon="📁"
        label="My Drive"
        active={view === "drive"}
        onClick={() => setView("drive")}
      />

      <MenuItem
        icon="⭐"
        label="Starred"
        active={view === "starred"}
        onClick={() => setView("starred")}
      />

      <MenuItem
        icon="🗑"
        label="Trash"
        active={view === "trash"}
        onClick={() => setView("trash")}
      />
    </div>
  );
}

function MenuItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        ...menuItem,
        background: active ? "#1e293b" : "transparent",
        color: active ? "#38bdf8" : "#e5e7eb",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

/* ---------------- Styles ---------------- */

const sidebar = {
  width: 240,
  background: "#020617",
  padding: 20,
  borderRight: "1px solid #1e293b",
};

const logo = {
  fontSize: 20,
  fontWeight: 600,
  color: "#f8fafc",
  marginBottom: 30,
};

const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  padding: "10px 14px",
  borderRadius: 12,
  cursor: "pointer",
  marginBottom: 8,
  fontSize: 15,
};

export default Sidebar;
