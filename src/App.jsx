import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Start, { action as startAction } from "./Start";
import PersonalPage from "./PersonalPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
    action: startAction,
  },
  {
    path: "/:code",
    element: <PersonalPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
