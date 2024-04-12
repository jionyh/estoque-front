import { Home, ShoppingCart, Package, Users2, LineChart } from "lucide-react";

export const menuList = [
  { link: "/", name: "Painel", icon: <Home /> },
  { link: "/estoque", name: "Estoque", icon: <ShoppingCart /> },
  { link: "/produtos", name: "Produtos", icon: <Package /> },
  { link: "/cadastrar", name: "Cadastros", icon: <Users2 /> },
  { link: "/relatorios", name: "Relatórios", icon: <LineChart /> },
];
