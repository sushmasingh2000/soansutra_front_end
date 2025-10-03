import React, { useState } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { enCryptData } from '../../../../utils/Secret';
import { endpoint } from '../../../../utils/APIRoutes';
import { FiUser, FiShield } from 'react-icons/fi';

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    const url =
      loginType === "superadmin" ? endpoint.login_super_user : endpoint.login;
    const req =
      loginType === "superadmin"
        ? { su_email: email, su_pass: password }
        : { username: email, password: password };

    try {
      const res = await axios.post(url, { payload: enCryptData(req) });
      toast(res?.data?.message);
      localStorage.clear();
      if (res?.data?.success) {
        navigate("/admin-dashboard");
        window.location.reload();
        localStorage.setItem("token", res?.data?.result?.token);
        localStorage.setItem("role", res?.data?.result?.role);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-[#397EF3] via-[#060C95] to-[#00008B]">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 py-10 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8 tracking-wide">
          Welcome Back
        </h2>

        {/* Login Type Toggle (Segmented Switch Style) */}
        <div className="flex bg-gray-200 rounded-full p-1 mb-6">
          {["user", "superadmin"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setLoginType(type)}
              className={`w-1/2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${loginType === type
                  ? "bg-green-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {type === "user" ? "👤 Staff Login" : "🔐 Super Admin"}
              {/* {type === "user" ? <FiUser size={18} /> : <FiShield size={18} />}
              {type === "user" ?  "Staff Login" : "Super Admin"} */}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-white mb-1 ml-1">Username</label>
            <div className="flex items-center bg-white/20 border border-white/30 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500">
              <input
                type="text"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 bg-transparent text-white placeholder-white/70 outline-none"
              />
              <div className="p-2 text-white/80">
                <AiOutlineMail size={24} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-white mb-1 ml-1">Password</label>
            <div className="flex items-center bg-white/20 border border-white/30 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-purple-500">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-transparent text-white placeholder-white/70 outline-none"
              />
              <div className="p-2 text-white/80">
                <AiFillLock size={24} />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded-full font-semibold shadow-md transition-all duration-200 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-t from-[#1E3C94] to-[#7D85FE] hover:from-[#1E3C94]"
              }`}
          >
            {loading ? "Logging in..." : "Login Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
