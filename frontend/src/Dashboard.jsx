import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import FileGrid from "./components/FileGrid";

function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 🔹 Active view (drive / starred / trash)
  const [view, setView] = useState("drive");

  // 🔐 Protect dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // ➕ Open file picker
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // allow re-upload same file
      fileInputRef.current.click();
    }
  };

  // 📤 UPLOAD FILE (THIS WAS MISSING)
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile); // 🔴 must be "file"

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://127.0.0.1:8000/files/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // ❌ do NOT set Content-Type
          },
        }
      );

      alert("Upload successful ✅");
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Upload failed ❌");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a" }}>
      <Sidebar view={view} setView={setView} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onUploadClick={handleUploadClick} />

        <FileGrid view={view} />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default Dashboard;
