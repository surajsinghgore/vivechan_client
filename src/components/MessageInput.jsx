import  { useState } from 'react';
import FileUploadModal from './FileUploadModal';

function MessageInput() {
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
    // Implement the actual file upload to a server or storage here.
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Type a message"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring"
        />
        <button 
          className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
          onClick={handleModalOpen}
        >
          <i className="fas fa-paperclip"></i>
        </button>
        <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>

      {/* Include the modal here */}
      <FileUploadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
}

export default MessageInput;
