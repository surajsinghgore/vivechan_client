import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRegister } from "../../utils/validation/FormValidation";
import { RegisterApi } from "../../utils/services/authServices";
import { toast } from "react-hot-toast";
import TopLoadingBar from "react-top-loading-bar";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,

    reset,
  } = useForm({
    resolver: yupResolver(validateRegister),
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }

    setInputKey(Date.now());
  };

  const handleRemovePreview = () => {
    setProfileImage(null);
    setPreview(null);
    setInputKey(Date.now());
  };

  const handleRegister = async (data) => {
    if (!profileImage) {
      setError("profileImage", {
        type: "manual",
        message: "Profile Image is required.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("bio", data.bio);
    formData.append("gender", data.gender);
    formData.append("dob", data.dob);
    formData.append("profile", profileImage);

    setLoading(true);
    setProgress(10);

    try {
      const res = await RegisterApi(formData, {
        onUploadProgress: (event) => {
          if (event.lengthComputable) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);

            let stage = Math.min(Math.floor(percentCompleted / 20) * 20, 100);
            if (stage > progress) {
              setProgress(stage);
            }
          }
        },
      });

      if (res) {
        toast.success("Registration successfully");
        reset();
        setProfileImage(null);
        setPreview(null);
        setInputKey(Date.now());

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.data.message);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[98.8vw] py-4 items-center justify-center min-h-screen bg-gray-100 overflow-x-hidden">
      <TopLoadingBar progress={progress} onLoaderFinished={() => setProgress(0)} color="#3498db" height={3} />
      <div className="w-full my-2 max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {preview && (
          <div className="flex flex-col items-center mb-6">
            <img src={preview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full mb-4" />
            <button onClick={handleRemovePreview} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring">
              Remove Preview
            </button>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              {...register("username")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.username ? "border-red-500" : ""}`}
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              {...register("dob")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.dob ? "border-red-500" : ""}`}
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              {...register("gender")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.gender ? "border-red-500" : ""}`}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>
          <div>
            <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              id="profileImage"
              key={inputKey}
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.profileImage ? "border-red-500" : ""}`}
            />
            {!preview && errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              {...register("bio")}
              className={`w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${errors.bio ? "border-red-500" : ""}`}
              placeholder="Tell us about yourself"
            />
            {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
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
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
