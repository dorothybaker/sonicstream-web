import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function SidebarItem({ icon: Icon, label, href, active }) {
  return (
    <Link
      to={href}
      className={twMerge(
        `flex flex-row items-center hover:text-white transition text-neutral-400 py-1 gap-x-3`,
        active && "text-white"
      )}
    >
      <Icon size={24} />
      <p className="w-full line-clamp-1">{label}</p>
    </Link>
  );
}

export default SidebarItem;
