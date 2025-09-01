import { Video } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaVideo } from 'react-icons/fa';
import { apiConnectorPost } from '../../../utils/ApiConnector';
import { endpoint } from '../../../utils/APIRoutes';
import th from "../../../assets/th.png";

const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gradient-to-b from-pink-100 to-indigo-100 rounded-xl p-6 w-80 relative text-center">
            <button onClick={onClose} className="absolute top-2 right-3 text-2xl text-gray-600">×</button>
            <div className='flex justify-center'>
                <img src={th} alt="Success" className="w-12 mb-2" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Thank you!</h3>
            <p className="text-sm text-gray-700 mb-3">
                Our consultant will call you in 15 minutes to confirm your appointment
            </p>
            <p className="text-xs text-gray-600">
                You can also call our toll free<br />
                <a href="tel:18001020103" className="text-purple-600 font-semibold">1800-102-0103</a>
            </p>
        </div>
    </div>
);

const VideoCallModal = ({ isOpen, onClose }) => {
    const [mobile, setMobile] = useState('');
    const [dc_language, setDcLanguage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleScheduleCall = async () => {
        if (!mobile || !dc_language) {
            toast.error("Please enter mobile number and select a language.");
            return;
        }

        if (!/^\d{10}$/.test(mobile)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }
        try {
            setLoading(true);
            const now = new Date();
            now.setMinutes(now.getMinutes() + 15);
            const sch_date_time = now.toISOString();

            const rebody = { mobile, sch_date_time, dc_language };
            const response = await apiConnectorPost(endpoint?.req_demo_call, rebody);
            toast.success(response?.data?.message || "Request sent");
            if (response.data?.success) {
                setSuccess(true);
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Malayalam', 'Others'];

    return (
        <>
            {success && <SuccessModal onClose={() => setSuccess(false)} />}
            {!success && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Live Video call at your convenience!</h3>
                            <button onClick={onClose} className="text-2xl text-gray-600">×</button>
                        </div>

                        <div className="flex flex-col md:flex-row mt-6 gap-6">
                            {/* Video Section */}
                            <div className="w-full md:w-1/2">
                                <video
                                    src="https://banner.caratlane.com/stage-images/3a13bcf3f874493a91bcc592894131dd.mp4"
                                    className="w-full rounded-lg"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <p className="text-xs mt-2 text-center">
                                    Want to get a closer look now? Hop on a video call with our design consultants and see your favorite designs live.
                                </p>
                            </div>

                            {/* Form Section */}
                            <div className="w-full md:w-1/2 flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row gap-3">
                                    <select className="border rounded px-3 py-2 w-full md:w-1/3">
                                        <option value="+91">IN +91</option>
                                        <option value="+1">US +1</option>
                                        <option value="+44">UK +44</option>
                                    </select>
                                    <input
                                        type="tel"
                                        placeholder="Enter Mobile*"
                                        className="border rounded px-3 py-2 w-full"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))} // remove non-digits
                                        maxLength={10}
                                        inputMode="numeric"
                                    />

                                </div>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={() => setDcLanguage(lang)}
                                            className={`px-4 py-2 rounded-full border text-sm ${dc_language === lang
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-100 text-black'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>

                                <div className="text-xs bg-red-50 text-red-700 p-2 rounded mt-2">
                                    Real images and videos will be shared via WhatsApp
                                </div>

                                <button
                                    onClick={handleScheduleCall}
                                    disabled={loading}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
                                >
                                    <FaVideo className="text-white" />
                                    {loading ? 'Scheduling...' : 'SCHEDULE A VIDEO CALL'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoCallModal;
