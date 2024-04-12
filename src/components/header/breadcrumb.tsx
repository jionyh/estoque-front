"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function BreadcrumbComponent() {
  const pathname = usePathname();
  const paths = [
    "painel",
    ...pathname.split("/").map((item) => item.trim()),
  ].filter(Boolean);
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.length > 0 &&
          paths.map((path, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={path === "painel" ? "/" : path}>
                    {path === "" ? capitalize("Painel") : capitalize(path)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i + 1 < paths.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
