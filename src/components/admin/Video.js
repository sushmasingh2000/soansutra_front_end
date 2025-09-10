import React, { useEffect, useState } from "react";
import { apiConnectorGet, apiConnectorPost } from "../../utils/ApiConnector";
import { endpoint } from "../../utils/APIRoutes";
import toast from "react-hot-toast";
import { DeleteForever, Edit, ToggleOn, ToggleOff } from "@mui/icons-material";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [formData, setFormData] = useState({
    v_id: "",
    video_name: "",
    video_file: "",
    video_status: false,
  });

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await apiConnectorGet(endpoint.get_video);
      setVideos(res?.data?.result || []);
    } catch {
      toast.error("Failed to fetch videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const resetForm = () => {
    setFormData({ v_id: "", video_name: "", video_file: "", video_status: false });
    setSelectedVideo(null);
  };

  // Create or Update Video
  const handleSubmit = async () => {
    const { video_name, video_file, v_id } = formData;
    if (!video_name || !video_file) {
      toast.error("Video name and file are required.");
      return;
    }

    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("video_name", video_name);
    formPayload.append("file", video_file); // file field required by backend

    if (selectedVideo) {
      formPayload.append("v_id", v_id);
    }

    const apiUrl = selectedVideo ? endpoint.update_video : endpoint.create_video;

    try {
      const res = await apiConnectorPost(apiUrl, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast(res?.data?.message);
      fetchVideos();
      setModalOpen(false);
      resetForm();
    } catch {
      toast.error("Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setFormData({
      v_id: video.vid_id,
      video_name: video.video_name,
      video_file: "", // file input must be re-selected
      video_status: video.video_status,
    });
    setModalOpen(true);
  };

  const handleDelete = async (v_id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.delete_video}?v_id=${v_id}`);
      toast.success(res?.data?.message || "Video deleted.");
      fetchVideos();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const toggleStatus = async (v_id) => {
    try {
      const res = await apiConnectorGet(`${endpoint.status_Video}?v_id=${v_id}`);
      toast.success(res?.data?.message || "Status updated.");
      fetchVideos();
    } catch {
      toast.error("Could not change status.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Videos</h1>
        <button
          onClick={() => {
            setModalOpen(true);
            resetForm();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Video
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">S.No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Preview</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={video.vid_id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{video.video_name}</td>
                <td className="px-4 py-2">
                  <video
                    src={video.vid_url}
                    controls
                    className="w-32 rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => toggleStatus(video.vid_id)}>
                    {video.video_status ? <ToggleOn /> : <ToggleOff />}
                  </button>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(video)}
                    className="text-blue-600 hover:underline"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(video.vid_id)}
                    className="text-red-600 hover:underline"
                  >
                    <DeleteForever />
                  </button>
                </td>
              </tr>
            ))}
            {videos.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No videos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">
              {selectedVideo ? "Edit Video" : "Add Video"}
            </h2>
            <input
              type="text"
              name="video_name"
              placeholder="Video name"
              value={formData.video_name}
              onChange={(e) =>
                setFormData({ ...formData, video_name: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) =>
                setFormData({ ...formData, video_file: e.target.files[0] })
              }
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  resetForm();
                }}
                disabled={loading}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {loading ? "Saving..." : selectedVideo ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
