import React from 'react';

function FileUploadModal({ isOpen, onClose, onFileUpload }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Upload Files</h3>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => onFileUpload(e.target.files, 'image')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Videos</label>
            <input
              type="file"
              accept="video/*"
              multiple
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => onFileUpload(e.target.files, 'video')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Audio</label>
            <input
              type="file"
              accept="audio/*"
              multiple
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => onFileUpload(e.target.files, 'audio')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Documents</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              multiple
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => onFileUpload(e.target.files, 'document')}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FileUploadModal;
