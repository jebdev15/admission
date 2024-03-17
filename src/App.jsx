import { RouterProvider, createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      let { action, Component, loader, ErrorBoundary } = await import(
        "./components/entry/Start"
      );
      return {
        Component,
        action,
        loader,
        ErrorBoundary,
      };
    },
  },
  {
    path: "/:code",
    lazy: async () => {
      let { Component, loader, action } = await import(
        "./components/entry/PersonalPage"
      );
      return {
        Component,
        loader,
        action,
      };
    },
  },
  {
    path: "/admin",
    lazy: async () => {
      let { Component, action } = await import("./components/admin/Admin");
      return {
        Component,
        action,
      };
    },
    children: [
      {
        index: true,
        lazy: async () => {
          let { Component } = await import("./components/admin/Login");
          return {
            Component,
          };
        },
      },
      {
        path: ":campus",
        lazy: async () => {
          let { Component, loader, action } = await import(
            "./components/admin/Dashboard"
          );
          return {
            Component,
            loader,
            action,
          };
        },
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
