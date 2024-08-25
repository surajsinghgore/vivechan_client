import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateLogin } from "../../utils/validation/FormValidation";
import { LoginApi } from "../../utils/services/authServices";
import { toast } from "react-hot-toast";
import TopLoadingBar from "react-top-loading-bar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    resolver: yupResolver(validateLogin),
  });

  const handleRegister = async (data) => {
    console.log(data);

    setLoading(true);
    setProgress(10);

    try {
      const res = await LoginApi(
        { username: data.emailOrUsername, password: data.password },
        {
          onUploadProgress: (event) => {
            if (event.lengthComputable) {
              const percentCompleted = Math.round((event.loaded * 100) / event.total);
              let stage = Math.min(Math.floor(percentCompleted / 20) * 20, 100);
              if (stage > progress) {
                setProgress(stage);
              }
            }
          },
        }
      );

      if (res) {
        toast.success("Login successful!");
        reset();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
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

        <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">
              Username / Email
            </label>
            <input
              id="emailOrUsername"
              name="emailOrUsername"
              type="text"
              {...register("emailOrUsername")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.emailOrUsername ? "border-red-500" : ""}`}
              placeholder="Enter your username  or email"
            />
            {errors.emailOrUsername && <p className="text-red-500 text-sm">{errors.emailOrUsername.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              {...register("password")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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

export default Login;
