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
  const paths = ["/", ...pathname.split("/").map((item) => item.trim())].filter(
    Boolean,
  );
  console.log(paths);
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.length > 0 &&
          paths.map((path, i) => (
            <React.Fragment key={i}>
              {i !== paths.length - 1 ? (
                // Se não for o último item, exibe como link
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={i === 0 ? "/" : `${paths[i - 1]}/${path}`}>
                      {path === "/" ? "Painel" : capitalize(path)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              ) : (
                // Se for o último item, exibe apenas o texto
                <BreadcrumbItem className="cursor-pointer">
                  {capitalize(path)}
                </BreadcrumbItem>
              )}
              {i + 1 < paths.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
