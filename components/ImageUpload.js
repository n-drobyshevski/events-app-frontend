import { useState } from "react";
import { API_URL } from "../config";

// import styles from "@/styles/Form.module.css";
export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(image);
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", evtId);
    formData.append("field", "image");
    console.log(formData);
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      console.log("image uploaded successfully");
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };
  return (
    <div className="">
      <h1>Upload image form</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}
