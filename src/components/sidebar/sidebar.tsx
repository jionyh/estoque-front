import {
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import SidebarMenuItem from "./menuItem";

const menuList = [
  { link: "/", name: "Painel", icon: <Home /> },
  { link: "/estoque", name: "Estoque", icon: <ShoppingCart /> },
  { link: "/produtos", name: "Produtos", icon: <Package /> },
  { link: "/fornecedores", name: "Fornecedores", icon: <Users2 /> },
  { link: "/relatorios", name: "Relatórios", icon: <LineChart /> },
];

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
