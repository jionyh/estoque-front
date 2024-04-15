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
import { Supplier } from "@/types/supplier";

type Props = {
  edit?: boolean;
  data?: Supplier;
  apiFn: ApiFunctions;
};

export default function SupplierModal({ edit = false, data, apiFn }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [formData, setFormData] = useState<Omit<Supplier, "supplierId">>({
    name: "",
    email: "",
    phone: "",
  });
  const [open, setOpen] = useState(false);
  const dialogTitle = "Adicionar Fornecedor";

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) =>
    edit ? editFormSubmit(e) : createFormSubmit(e);

  const editFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!data) return;
    e.preventDefault();
    const loadingToast = toast.loading(`Editando Fornecedor...`);

    const res = await apiFn.supplier.edit({
      ...formData,
      supplierId: data.supplierId,
    });
    console.log(res);

    if (res.success) {
      toast.update(loadingToast, {
        render: `Fornecedor editado com sucesso!`,
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

    const loadingToast = toast.loading(`Criando Fornecedor...`);
    const res = await apiFn.supplier.create(formData);

    if (res.success) {
      toast.update(loadingToast, {
        render: `Fornecedor criado com sucesso!`,
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
      setFormData(data);
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
                Fornecedor
              </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {`Adicione novo Fornecedor e para finalizar clique em salvar`}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={cn("grid items-start gap-3")}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={`Adicione o nome`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={`Adicione o email`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Fornecedor</Label>
              <Input
                id="name"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder={`Adicione o telefone`}
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
              Fornecedor
            </span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="p-2">
        <DrawerHeader className="text-left">
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>
            {`Adicione novo Fornecedor e para finalizar clique em salvar`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={cn("grid items-start gap-3")}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder={`Adicione o nome`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={`Adicione o email`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Fornecedor</Label>
              <Input
                id="name"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder={`Adicione o telefone`}
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
