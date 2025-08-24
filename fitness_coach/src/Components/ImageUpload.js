import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Show preview before uploading
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Upload Your Body Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br /><br />

      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", borderRadius: "10px" }}
          />
          <br />
        </div>
      )}

      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload
      </button>

      <p>{message}</p>
    </div>
  );
};

export default ImageUpload;
