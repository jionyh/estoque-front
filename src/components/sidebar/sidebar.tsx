import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
} from "lucide-react";
import SidebarMenuItem from "./menuItem";
import { menuList } from "@/constants/menuItem";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {menuList.map((item, i) => (
          <SidebarMenuItem
            key={i}
            link={item.link}
            name={item.name}
            icon={item.icon}
          />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <SidebarMenuItem
          link="/configuracoes"
          name="Configurações"
          icon={<Settings />}
        />
      </nav>
    </aside>
  );
}
