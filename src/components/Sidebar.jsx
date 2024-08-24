import React, { useState } from "react";
import FileUploadModal from "./FileUploadModal";

function Sidebar() {
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

  return (
    <div className="w-1/4 bg-white shadow-lg border-r border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Chats</h2>
        <button className="p-2 rounded-full hover:bg-gray-100" onClick={handleModalOpen}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="p-4 space-y-4">
        {/* Example chat */}
        <div className="flex items-center space-x-4">
          <img src="https://i.pravatar.cc/40?img=1" alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="font-semibold">Patrick Hendricks</h4>
            <p className="text-sm text-gray-500">Hey! there I'm available...</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <img src="https://i.pravatar.cc/40?img=2" alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="font-semibold">Mark Messer</h4>
            <p className="text-sm text-gray-500">Images</p>
          </div>
          <span className="text-sm text-red-500">02</span>
        </div>
        <div className="flex items-center space-x-4">
          <img src="https://i.pravatar.cc/40?img=3" alt="User" className="w-10 h-10 rounded-full" />
          <div>
            <h4 className="font-semibold">General</h4>
            <p className="text-sm text-gray-500">This theme is Awesome!</p>
          </div>
        </div>
        {/* Add more chats as needed */}
      </div>
      {/* Include the modal here */}
      <FileUploadModal isOpen={isModalOpen} onClose={handleModalClose} onFileUpload={handleFileUpload} />
    </div>
  );
}

export default Sidebar;
