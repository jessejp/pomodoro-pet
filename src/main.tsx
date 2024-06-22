import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root.tsx";
import StartSessionMainMenu from "./routes/StartSessionMainMenu.tsx";
import { FocusSession } from "./routes/FocusSession.tsx";

const devGUI = window.location.search === "?dev=1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <main>NO SUCH PAGE</main>,
    children: [
      {
        path: "/",
        element: <StartSessionMainMenu />,
      },
      {
        path: "/focus-session",
        element: <FocusSession />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
