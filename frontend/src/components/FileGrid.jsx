import { useEffect, useState } from "react";
import axios from "axios";

function FileGrid({ view = "drive" }) {
  const [files, setFiles] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const token = localStorage.getItem("token");

  const starred = JSON.parse(localStorage.getItem("starredFiles")) || [];
  const trashed = JSON.parse(localStorage.getItem("trashedFiles")) || [];

  /* ================= FETCH FILES ================= */
  const fetchFiles = async () => {
    const res = await axios.get("http://127.0.0.1:8000/files", {
      headers: { Authorization: `Bearer ${token}` },
    });

    let formatted = res.data.map((f) => ({ name: f }));

    if (view === "starred") formatted = formatted.filter((f) => starred.includes(f.name));
    if (view === "trash") formatted = formatted.filter((f) => trashed.includes(f.name));
    if (view === "drive") formatted = formatted.filter((f) => !trashed.includes(f.name));

    setFiles(formatted);
  };

  useEffect(() => {
    fetchFiles();
  }, [view]);

  /* ================= PREVIEW ================= */
  const fetchPreviewUrl = async (filename) => {
    const res = await axios.get(
      `http://127.0.0.1:8000/files/preview/${filename}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      }
    );
    return URL.createObjectURL(res.data);
  };

  const openPreview = async (file) => {
    const url = await fetchPreviewUrl(file.name);
    setPreviewFile(file);
    setPreviewUrl(url);
  };

  const closePreview = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewFile(null);
    setPreviewUrl(null);
  };

  /* ================= ACTIONS ================= */
  const deleteFile = (filename) => {
    localStorage.setItem("trashedFiles", JSON.stringify([...trashed, filename]));
    setOpenMenu(null);
    fetchFiles();
  };

  const restoreFile = (filename) => {
    localStorage.setItem(
      "trashedFiles",
      JSON.stringify(trashed.filter((f) => f !== filename))
    );
    setOpenMenu(null);
    fetchFiles();
  };

  const toggleStar = (filename) => {
    const updated = starred.includes(filename)
      ? starred.filter((f) => f !== filename)
      : [...starred, filename];
    localStorage.setItem("starredFiles", JSON.stringify(updated));
    setOpenMenu(null);
    fetchFiles();
  };

  /* ================= HELPERS ================= */
  const getIcon = (name) => {
    name = name.toLowerCase();
    if (name.endsWith(".pdf")) return "📕";
    if (name.match(/\.(png|jpg|jpeg)$/)) return "🖼️";
    if (name.endsWith(".txt")) return "📄";
    if (name.match(/\.(doc|docx)$/)) return "📝";
    return "📁";
  };

  const previewType = (name) => {
    name = name.toLowerCase();
    if (name.match(/\.(png|jpg|jpeg)$/)) return "image";
    if (name.endsWith(".pdf")) return "pdf";
    return "other";
  };

  /* ================= UI ================= */
  return (
    <div style={grid}>
      {files.map((file, index) => (
        <div
          key={index}
          style={card}
          onDoubleClick={() => openPreview(file)}
        >
          {/* MENU */}
          <div style={menuWrapper}>
            <span
              style={menuIcon}
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(openMenu === index ? null : index);
              }}
            >
              ⋮
            </span>

            {openMenu === index && (
              <div style={menu} onClick={(e) => e.stopPropagation()}>
                {view !== "trash" && (
                  <>
                    <MenuItem
                      label={starred.includes(file.name) ? "Unstar" : "Star"}
                      icon="⭐"
                      onClick={() => toggleStar(file.name)}
                    />

                    <MenuItem
                      label="Get link"
                      icon="🔗"
                      onClick={() => {
                        const link = `http://127.0.0.1:8000/files/share/${file.name}`;
                        navigator.clipboard.writeText(link);
                        alert("Share link copied!");
                      }}
                    />

                    <MenuItem
                      label="Download"
                      icon="⬇"
                      onClick={() =>
                        window.open(
                          `http://127.0.0.1:8000/files/download/${file.name}`,
                          "_blank"
                        )
                      }
                    />

                    <MenuItem
                      label="Move to trash"
                      icon="🗑"
                      danger
                      onClick={() => deleteFile(file.name)}
                    />
                  </>
                )}

                {view === "trash" && (
                  <MenuItem
                    label="Restore"
                    icon="♻"
                    onClick={() => restoreFile(file.name)}
                  />
                )}
              </div>
            )}
          </div>

          <div style={icon}>{getIcon(file.name)}</div>
          <div style={fileName}>{file.name}</div>
        </div>
      ))}

      {/* PREVIEW MODAL */}
      {previewFile && (
        <div style={overlay} onClick={closePreview}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <span>{previewFile.name}</span>
              <button style={closeBtn} onClick={closePreview}>✕</button>
            </div>

            <div style={modalBody}>
              {previewType(previewFile.name) === "image" && (
                <img src={previewUrl} style={{ maxHeight: "70vh" }} />
              )}

              {previewType(previewFile.name) === "pdf" && (
                <iframe src={previewUrl} style={{ width: "100%", height: "70vh" }} />
              )}

              {previewType(previewFile.name) === "other" && (
                <button
                  style={downloadBtn}
                  onClick={() =>
                    window.open(
                      `http://127.0.0.1:8000/files/download/${previewFile.name}`,
                      "_blank"
                    )
                  }
                >
                  Download
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= MENU ITEM ================= */
const MenuItem = ({ label, icon, onClick, danger }) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    style={{
      padding: "10px 12px",
      fontSize: 14,
      cursor: "pointer",
      color: danger ? "#ef4444" : "#e5e7eb",
    }}
  >
    {icon} {label}
  </div>
);

/* ================= STYLES ================= */
const grid = {
  padding: 28,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 28,
};

const card = {
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: 16,
  padding: 18,
  position: "relative",
  cursor: "pointer",
};

const icon = { fontSize: 48, textAlign: "center", marginTop: 20 };
const fileName = { marginTop: 14, fontSize: 14, textAlign: "center", color: "#e5e7eb" };
const menuWrapper = { position: "absolute", top: 10, right: 12 };
const menuIcon = { cursor: "pointer", fontSize: 18, color: "#94a3b8" };
const menu = {
  position: "absolute",
  top: 22,
  right: 0,
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: 8,
  width: 160,
};

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  background: "#020617",
  border: "1px solid #1e293b",
  borderRadius: 12,
  width: "80%",
  maxWidth: 900,
  padding: 16,
};

const modalHeader = {
  display: "flex",
  justifyContent: "space-between",
  color: "#e5e7eb",
};

const modalBody = { display: "flex", justifyContent: "center" };
const closeBtn = { background: "none", border: "none", color: "#e5e7eb", cursor: "pointer" };
const downloadBtn = {
  padding: "10px 18px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "white",
};

export default FileGrid;
