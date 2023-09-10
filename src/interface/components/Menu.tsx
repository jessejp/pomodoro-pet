import React, { useState, type PropsWithChildren } from "react";

type Tab = {
  icon: string;
  component: JSX.Element;
};

interface MenuProps {
  tabs: Tab[];
}

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ tabs }) => {
  const [selectedTabIndex] = useState(0);
  return (
    <div className="relative h-min">{tabs[selectedTabIndex].component}</div>
  );
};

export default Menu;
