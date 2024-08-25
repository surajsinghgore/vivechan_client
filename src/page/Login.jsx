import { useState } from "react";
import { LoginApi } from "../../utils/services/authServices";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { setLocalStorage } from "../../utils/LocalStorageUtils";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  setProgress(10);

  try {
    const res = await fetch("http://localhost:5000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setLocalStorage('token',data.data.token)
      toast.success("Login successful!");
      
      setTimeout(() => {
        navigate("/dashboard");
        
      }, 2000);
    } else {
      // Show error message based on the response
      toast.error(data.message || "Login failed");
    }
  } catch (error) {
    // Handle network or other errors
    console.error("An error occurred:", error);
    toast.error("An unexpected error occurred");
  } finally {
    setProgress(100);
    setLoading(false);
  }
};

  return (
    <div className="flex w-[98.8vw] py-4 items-center justify-center min-h-screen bg-gray-100 overflow-x-hidden">
        <TopLoadingBar progress={progress} onLoaderFinished={() => setProgress(0)} color="#3498db" height={3} />
      <div className="w-full my-2 max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login In</h2>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">
              Username / Email
            </label>
            <input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 `}
              placeholder="Enter your username  or email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 `}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging..." : "Login In"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don&rsquo;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
