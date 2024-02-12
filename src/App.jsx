import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      let { action, Component } = await import("./Start");
      return {
        Component,
        action,
      };
    },
  },
  {
    path: "/:code",
    lazy: async () => {
      let { Component, loader, action } = await import("./PersonalPage");
      return {
        Component,
        loader,
        action,
      };
    },
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
