import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

type MenuItemsProps = {
  route?: string;
  icon?: ReactNode;
  name?: string;
};

const MenuItems = ({ route, icon, name }: MenuItemsProps) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `flex items-center space-x-2 p-2 rounded transition ${
          isActive ? " text-yellow-400" : "text-white hover:text-yellow-400"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span className="text-base">{name}</span>
    </NavLink>
  );
};

export default MenuItems;
