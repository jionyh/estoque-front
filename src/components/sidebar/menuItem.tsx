"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  link: string;
  name: string;
  icon: JSX.Element;
};

export default function SidebarMenuItem({ link, name, icon }: Props) {
  const pathname = usePathname();
  const activePath = pathname === link || pathname.startsWith(`${link}/`);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={link}
            className={`${activePath ? "bg-primary text-primary-foreground hover:text-primary-foreground" : "hover:text-primary"} link flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors  md:h-8 md:w-8`}
          >
            {icon}
            <span className="sr-only">{capitalize(name)}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{capitalize(name)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
