import { useState } from "react";
import FileUploadModal from "./FileUploadModal";
import { useEffect } from "react";
import { GetAllUserApi } from "../../utils/services/userServices";
import { setLocalStorage } from "../../utils/LocalStorageUtils";

function Sidebar() {
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (files, fileType) => {
    // Handle the file upload logic here, based on the fileType (image, video, audio, document)
    console.log(`Uploading ${fileType}:`, files);
    // You can implement the actual file upload to a server or storage here.
  };

  const fetchAllUsers = async () => {
    try {
      const res = await GetAllUserApi();
      if (res.success) {
        setUserData(res.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = (id) => {
    setLocalStorage("current", id);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="w-1/4 bg-white shadow-lg border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleModalOpen}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="p-4 space-y-4">
        {userData.lenght !== 0 ? (
          <>
            {userData.map((item) => {
              return (
                <div className="flex items-center space-x-4 cursor-pointer hover:bg-red-200" key={item._id} onClick={() => currentUser(item._id)}>
                  <img src={item.profile} alt={item.profile} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-semibold">{item.username}</h4>
                    <p className="text-sm text-gray-500">{item.bio}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          ""
        )}

        {/* Add more chats as needed */}
      </div>
      {/* Include the modal here */}
      <FileUploadModal isOpen={isModalOpen} onClose={handleModalClose} onFileUpload={handleFileUpload} />
    </div>
  );
}

export default Sidebar;
