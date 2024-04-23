"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import { ApiFunctions } from "@/types/apiFunctions";
import { InventoryItem } from "@/types/inventory";
import { Minus, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

type Props = {
  data: InventoryItem;
  apiFn: ApiFunctions;
};

export default function RemoveInventoryButton({ data, apiFn }: Props) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function handleOpenChange(open: boolean) {
    setOpen(open);
    if (!open) {
      setValue(0);
    }
  }

  function handleValueChange(type: "add" | "sub") {
    const max = data.quantity;
    switch (type) {
      case "add":
        if (value < max) {
          setValue((prev) => prev + 1);
        }
        break;
      case "sub":
        if (value > 0) {
          setValue((prev) => prev - 1);
        }
        break;
    }
  }

  const handleInventoryRemove = async () => {
    const loadingToast = toast.loading(`Movimentando estoque...`);
    const res = await apiFn.inventoryEntry.remove({
      productId: data.productId,
      quantity: value,
    });

    if (res.success) {
      toast.update(loadingToast, {
        render: `Estoque alterado com sucesso!`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } else {
      if (Array.isArray(res.data)) {
        res.data.forEach((item) =>
          toast.update(loadingToast, {
            render: `${item.message}`,
            type: "error",
            isLoading: false,
            autoClose: 2000,
          }),
        );
      } else {
        toast.update(loadingToast, {
          render: `${res.data}`,
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }

    if (res.success) {
      setValue(0);
      setOpen(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange} modal>
        <DialogTrigger className="flex items-center">
          <Button variant="outline" size="icon">
            <Minus size={20} className="text-destructive" />
          </Button>
        </DialogTrigger>
        <DialogContent className="select-none">
          <DialogHeader>
            <DialogTitle>
              <span className="mb-2">Removendo do estoque</span> <br />
              <span className="mt-2 block text-pretty text-lg font-bold text-destructive ">
                {data.name}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex h-24  items-center justify-center gap-4">
            <Button
              onClick={() => handleValueChange("sub")}
              disabled={value === 0}
              variant={"outline"}
              size={"icon"}
              className="h-16 w-16 bg-destructive hover:bg-destructive/80"
            >
              <Minus className="text-destructive-foreground" />
            </Button>
            <Input
              value={value}
              disabled
              className="h-16 w-28 text-center text-4xl"
            />

            <Button
              onClick={() => handleValueChange("add")}
              disabled={value === data.quantity}
              variant={"outline"}
              size={"icon"}
              className="h-16 w-16 bg-primary hover:bg-primary/80"
            >
              <Plus className="text-primary-foreground" />
            </Button>
          </div>
          <DialogFooter className="px-0 pt-2">
            <Button
              onClick={handleInventoryRemove}
              className="w-full"
              variant="default"
            >{`Remover ${value} ${data.name}`}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={() => setValue(0)}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Minus size={20} className="text-destructive" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader className="p-2 text-left">
          <DrawerTitle>
            <span className="mb-2">Removendo do estoque</span> <br />
            <span className="mt-2 block text-pretty text-lg font-bold text-destructive ">
              {data.name}
            </span>
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex h-24  items-center justify-center gap-4">
          <Button
            onClick={() => handleValueChange("add")}
            variant={"outline"}
            size={"icon"}
            className="h-16 w-16 bg-primary hover:bg-primary/80"
          >
            <Plus className="text-primary-foreground" />
          </Button>
          <Input
            value={value}
            disabled
            className="h-16 w-28 text-center text-4xl"
          />
          <Button
            onClick={() => handleValueChange("sub")}
            variant={"outline"}
            size={"icon"}
            className="h-16 w-16 bg-destructive hover:bg-destructive/80"
          >
            <Minus className="text-destructive-foreground" />
          </Button>
        </div>
        <DrawerFooter className="px-0 pt-2">
          <Button variant="default">{`Remover ${value} ${data.name}`}</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
