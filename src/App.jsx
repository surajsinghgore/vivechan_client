import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Signup from "./page/Singup";
function App() {
  return (
    <>
     

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
               <div className="flex h-screen w-screen bg-gray-100">

                <Sidebar />
                <ChatWindow />
               </div>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
