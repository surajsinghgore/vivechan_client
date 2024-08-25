import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
import { Toaster } from "react-hot-toast";
function App({ children }) {
  return (
    <>
      <Toaster />
      <RouterProvider router={router}> {children}</RouterProvider>
    </>
  );
}

export default App;
