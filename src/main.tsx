import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root.tsx";
import { FocusSession } from "./routes/FocusSession.tsx";
import ConfigSession from "./routes/ConfigSession.tsx";
import CustomizePet from "./routes/CustomizePet.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <main>NO SUCH PAGE</main>,
    children: [
      {
        path: "/",
        element: <ConfigSession />,
      },
      {
        path: "/focus-session",
        element: <FocusSession />,
      },
      {
        path: "/customize",
        element: <CustomizePet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
