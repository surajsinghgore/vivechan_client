import { useState } from "react";

function Signup() {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now()); // Key to reset input

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }

    // Reset input value to handle re-selection of the same file
    setInputKey(Date.now());
  };

  const handleRemovePreview = () => {
    setProfileImage(null);
    setPreview(null);

    // Reset input value to handle re-selection of the same file
    setInputKey(Date.now());
  };

  return (
    <div className="flex w-[98.8vw] py-4 items-center justify-center min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="w-full my-2 max-w-lg p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {/* Profile Image Preview */}
        {preview && (
          <div className="flex flex-col items-center mb-6">
            <img src={preview} alt="Profile Preview" className="w-32 h-32 object-cover rounded-full mb-4" />
            <button onClick={handleRemovePreview} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring">
              Remove Preview
            </button>
          </div>
        )}

        <form className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input id="email" name="email" type="email" required className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter your email" />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input id="dob" name="dob" type="date" required className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300" />
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
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea id="bio" name="bio" rows="4" className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300" placeholder="Tell us about yourself" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
