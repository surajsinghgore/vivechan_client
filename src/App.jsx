import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router";
function App({ children }) {
  return (
    <>
      <RouterProvider router={router}> {children}</RouterProvider>
    </>
  );
}

export default App;
