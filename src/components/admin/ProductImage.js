import React, { useState, useEffect } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";

const ProductImageManager = ({ productId }) => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  const fetchImages = async () => {
    const res = await apiConnectorGet(
      `${endpoint.get_product_image}?product_id=${productId}`
    );
    if (res?.data?.success) setImages(res.data.result);
    else toast.error("Failed to load images.");
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file to upload.");
    const form = new FormData();
    form.append("file", file);
    form.append("product_id", productId);
    const res = await apiConnectorPost(endpoint.upload_product_image, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res?.data?.success) {
      toast.success(res.data.message || "Uploaded.");
      setFile(null);
      fetchImages();
    } else toast.error(res.data.message);
  };

  const handleUpdate = async () => {
    if (!file || !updateId) return toast.error("Select image to update.");
    const form = new FormData();
    form.append("file", file);
    form.append("image_id", updateId);
    const res = await apiConnectorPost(endpoint.update_product_image, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res?.data?.success) {
      toast.success(res.data.message || "Updated.");
      setFile(null);
      setUpdateId(null);
      fetchImages();
    } else toast.error(res.data.message);
  };

  const handleDelete = async (imgId) => {
    const res = await apiConnectorGet(
      `${endpoint.delete_product_image}?image_id=${imgId}`
    );
    if (res?.data?.success) {
      toast.success(res.data.message);
      fetchImages();
    } else toast.error(res.data.message);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={updateId ? handleUpdate : handleUpload}
          className="btn-blue"
        >
          {updateId ? "Update Image" : "Upload"}
        </button>
        {updateId && (
          <button
            onClick={() => {
              setUpdateId(null);
              setFile(null);
            }}
            className="btn-gray"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images?.map((img) => (
          <div key={img.p_img_id} className="border p-2 relative">
            <img
              src={img.p_image_url}
              alt="Product"
              className="w-full h-24 object-cover rounded"
            />
            <div className="absolute top-1 right-1 space-x-1">
              <div key={img.p_img_id} className="border p-2 relative">
                <img
                  src={img.p_image_url}
                  alt="Product"
                  className="w-full h-24 object-cover rounded"
                />
                <div className="absolute top-1 right-1 space-x-1">
                  <button
                    onClick={() => {
                      setUpdateId(img.p_img_id);
                    }}
                  >
                    ✏️
                  </button>
                  <button onClick={() => handleDelete(img.p_img_id)}>🗑️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageManager;
