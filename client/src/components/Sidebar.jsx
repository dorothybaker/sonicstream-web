import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { GoGear, GoSearch } from "react-icons/go";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

function Sidebar({ children }) {
  const { pathname } = useLocation();

  const routes = useMemo(
    () => [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: GoGear,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: GoSearch,
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 p-4">
            <h1 className="font-medium text-2xl text-[#22c55e]">
              <Link to={"/"}>Sonicstream</Link>
            </h1>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className={"overflow-y-auto h-full"}>
          <Library />
        </Box>
      </div>
      <main className="h-full overflow-y-auto py-2 md:pl-0 pl-2 pr-2 flex-1">
        {children}
      </main>
    </div>
  );
}

export default Sidebar;
