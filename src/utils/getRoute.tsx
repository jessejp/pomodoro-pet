import { Location } from "react-router-dom";
import { Routes } from "../main";

export function getRoute(location: Location<any>): (typeof Routes)[number] {
  const pathname = location.pathname as (typeof Routes)[number]["path"];
  return (
    Routes.find((e) => e.path === pathname) ?? {
      path: "/error",
      element: <div></div>,
      rootLayout: "default",
    }
  );
}
