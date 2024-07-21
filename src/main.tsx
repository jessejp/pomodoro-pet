import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes/Root.tsx";
import { FocusSession } from "./routes/FocusSession.tsx";
import Start from "./routes/Start.tsx";
import CustomizePet from "./routes/CustomizePet.tsx";

export const Routes: {
  path: string;
  element: JSX.Element;
  rootLayout: "default" | "start-button";
}[] = [
  {
    path: "/",
    element: <Start />,
    rootLayout: "start-button",
  },
  {
    path: "/focus-session",
    element: <FocusSession />,
    rootLayout: "default",
  },
  {
    path: "/customize",
    element: <CustomizePet />,
    rootLayout: "default",
  },
] as const;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <main>NO SUCH PAGE</main>,
    children: Routes.map((r) => ({ path: r.path, element: r.element })),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
