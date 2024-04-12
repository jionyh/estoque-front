"use client";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Pencil, PlusCircle } from "lucide-react";

type Props = {
  type?: "Categoria" | "Unidade";
  edit?: boolean;
  children: React.ReactNode;
};

export default function CatAndUnitModal({
  children,
  type = "Categoria",
  edit = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const dialogTitle =
    type === "Categoria" ? "Adicionar Categoria" : "Adicionar Unidade";

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {edit ? (
            <div className="cursor-pointer rounded border p-1 text-blue-600">
              <Pencil size={20} />
            </div>
          ) : (
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {type}
              </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {`Adicione nova ${type} e para finalizar clique em salvar`}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {edit ? (
          <div className="cursor-pointer rounded border p-1 text-blue-600">
            <Pencil size={20} />
          </div>
        ) : (
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              {type}
            </span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="p-2">
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>
            {`Adicione nova ${type} e para finalizar clique em salvar`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="w-full" variant="outline">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
