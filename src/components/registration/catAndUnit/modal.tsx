"use client";
import { FormEvent, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { ApiFunctions } from "@/types/apiFunctions";

type Props = {
  type?: "Categoria" | "Unidade";
  edit?: boolean;
  data?: { id: number; name: string };
  apiFn: ApiFunctions;
};

export default function CatAndUnitModal({
  type = "Categoria",
  edit = false,
  data,
  apiFn,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const dialogTitle =
    type === "Categoria" ? "Adicionar Categoria" : "Adicionar Unidade";

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) =>
    edit ? editFormSubmit(e) : createFormSubmit(e);

  const editFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!data) return;
    e.preventDefault();
    let res;
    const loadingToast = toast.loading(`Editando ${type}...`);
    switch (type) {
      case "Categoria":
        res = await apiFn.category.edit(data.id, name);
        break;

      case "Unidade":
        res = await apiFn.unit.edit(data.id, name);
        break;
    }

    if (res.success) {
      toast.update(loadingToast, {
        render: `${type} editada com sucesso!`,
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

    if (res.success && setOpen) {
      setOpen(false);
    }
  };

  const createFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let res;
    const loadingToast = toast.loading(`Criando ${type}...`);
    switch (type) {
      case "Categoria":
        res = await apiFn.category.create(name);
        break;

      case "Unidade":
        res = await apiFn.unit.create(name);
        break;
    }

    if (res.success) {
      toast.update(loadingToast, {
        render: `${type} criada com sucesso!`,
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

    if (res.success && setOpen) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (edit && data) {
      setName(data.name);
    }
  }, [data, edit]);

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
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={cn("grid items-start gap-3")}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">{type}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`Adicione o nome da ${type}`}
              />
            </div>
            <Button type="submit">{edit ? "Editar" : "Salvar"}</Button>
          </form>
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
        <div className="px-4">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={cn("grid items-start gap-3")}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">{type}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`Adicione o nome da ${type}`}
              />
            </div>
            <Button type="submit">{edit ? "Editar" : "Salvar"}</Button>
          </form>
        </div>
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
