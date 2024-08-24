import MessageInput from "./MessageInput";

function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img src="https://i.pravatar.cc/40?img=4" alt="Doris Brown" className="w-10 h-10 rounded-full" />
          <h4 className="text-lg font-semibold">Doris Brown</h4>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-phone"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-video"></i>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="flex items-start space-x-4">
          <img src="https://i.pravatar.cc/40?img=4" alt="Avatar" className="w-8 h-8 rounded-full" />
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>Hello, how are you?</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <img src="https://i.pravatar.cc/40?img=4" alt="Avatar" className="w-8 h-8 rounded-full" />
          <div className="bg-gray-100 p-4 rounded-lg">
            <img src="https://via.placeholder.com/150" alt="Image" className="rounded-lg" />
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <img src="https://i.pravatar.cc/40?img=5" alt="Avatar" className="w-8 h-8 rounded-full" />
          <div className="bg-gray-100 p-4 rounded-lg">
            <a href="#" className="text-blue-500">
              admin_v1.0.zip
            </a>
            <span className="text-sm text-gray-500 ml-2">12.5 MB</span>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
