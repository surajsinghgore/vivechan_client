import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { GetUserByApi } from "../../utils/services/userServices";
import { getLocalStorage } from "../../utils/LocalStorageUtils";
import { io } from "socket.io-client";

function ChatWindow() {
  const [socket, setSocket] = useState(null);
  const [userData, setUserData] = useState({});
  const [messages, setMessages] = useState([]);

  // Fetch user data
  const fetchUserById = async () => {
    try {
      const id = getLocalStorage("current");
      const res = await GetUserByApi(id);
      if (res.success) {
        setUserData(res.data.user);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      const userId = getLocalStorage("user")?._id;
      socketInstance.emit("assignUserId", userId);

      // Receive message from other users
      socketInstance.on("sendMessageReceiver", ({ message, senderId }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, senderId, received: true }, 
        ]);
      });
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    // Clean up socket connection on component unmount
    return () => {
      socketInstance.off("connect");
      socketInstance.off("sendMessageReceiver");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserById();
  }, []);

  // Handle sending messages
  const handleSendMessage = (messageText) => {
    const senderId = getLocalStorage("user")?._id;
    const receiverId = getLocalStorage("current"); 

    if (socket && messageText) {
      // Emit the message to the server
      socket.emit("sendMessagePersonal", {
        receiverId,
        message: messageText,
        senderId,
      });

      // Add the sent message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: messageText, senderId, received: false }, // Mark the message as sent
      ]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img src={userData?.profile} alt="User Profile" className="w-10 h-10 rounded-full" />
          <h4 className="text-lg font-semibold">{userData?.username}</h4>
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
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start space-x-4 ${msg.received ? 'flex-row' : 'flex-row-reverse'}`}>
            <img src={userData?.profile} alt="Avatar" className="w-8 h-8 rounded-full" />
            <div className={`p-4 rounded-lg ${msg.received ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatWindow;
