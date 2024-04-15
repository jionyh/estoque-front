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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { ApiFunctions } from "@/types/apiFunctions";
import { Product, ProductCreate } from "@/types/product";
import { Unit } from "@/types/unit";
import { Category } from "@/types/category";

type Props = {
  edit?: boolean;
  data?: Product;
  apiFn: ApiFunctions;
};
const initialFormData = {
  name: "",
  categoryId: 0,
  minStock: 0,
  unitId: 0,
};

export default function ProductModal({ edit = false, data, apiFn }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const [formData, setFormData] =
    useState<Omit<ProductCreate, "productId">>(initialFormData);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [unitList, setUnitList] = useState<Unit[]>([]);

  async function getLists() {
    const catList = await apiFn.category.getAll();
    const unitList = await apiFn.unit.getAll();
    if (catList.success && unitList.success) {
      setCategoryList(catList.data);
      setUnitList(unitList.data);
    }
  }

  const dialogTitle = "Adicionar Produto";

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) =>
    edit ? editFormSubmit(e) : createFormSubmit(e);

  const editFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!data) return;
    e.preventDefault();
    const loadingToast = toast.loading(`Editando Produto...`);

    const res = await apiFn.product.edit({
      ...formData,
      productId: data.productId,
    });

    if (res.success) {
      toast.update(loadingToast, {
        render: `Produto editado com sucesso!`,
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
      setFormData(initialFormData);
      setOpen(false);
    }
  };

  const createFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading(`Criando Produto...`);
    const res = await apiFn.product.create(formData);

    if (res.success) {
      toast.update(loadingToast, {
        render: `Produto criado com sucesso!`,
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
      setFormData(initialFormData);
      setOpen(false);
    }
  };

  useEffect(() => {
    getLists();
  }, []);
  useEffect(() => {
    if (edit && data) {
      setFormData({
        name: data.name,
        categoryId: data.category.categoryId,
        unitId: data.unit.unitId,
        minStock: data.minStock,
      });
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
                Produto
              </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              {`Adicione novo Produto e para finalizar clique em salvar`}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={cn("grid items-start gap-4")}
          >
            <div className="grid gap-2">
              <Label htmlFor="productName">Nome Produto</Label>
              <Input
                id="productName"
                placeholder="Nome do produto"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={formData.categoryId.toString()}
                onValueChange={(prev) =>
                  setFormData({ ...formData, categoryId: parseInt(prev) })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryList.length === 0 ? (
                      <SelectItem value="0" disabled>
                        Carregando Lista....
                      </SelectItem>
                    ) : (
                      <SelectItem value="0" disabled>
                        Categoria
                      </SelectItem>
                    )}
                    {categoryList.length > 0 &&
                      categoryList.map((list) => (
                        <SelectItem
                          key={list.categoryId}
                          value={list.categoryId.toString()}
                        >
                          {list.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={formData.unitId.toString()}
                onValueChange={(prev) =>
                  setFormData({ ...formData, unitId: parseInt(prev) })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {unitList.length === 0 ? (
                      <SelectItem value="0" disabled>
                        Carregando Lista....
                      </SelectItem>
                    ) : (
                      <SelectItem value="0" disabled>
                        Unidade
                      </SelectItem>
                    )}
                    {unitList.length > 0 &&
                      unitList.map((list) => (
                        <SelectItem
                          key={list.unitId}
                          value={list.unitId.toString()}
                        >
                          {list.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-full items-end justify-between gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="minStock">Quantidade Mínima em estoque</Label>
                <Input
                  id="minStock"
                  placeholder="exemplo: 10"
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minStock: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <Button type="submit">Salvar</Button>
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
            {`Adicione novo Produto e para finalizar clique em salvar`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={cn("grid items-start gap-4")}
          >
            <div className="grid gap-2">
              <Label htmlFor="productName">Nome Produto</Label>
              <Input
                id="productName"
                placeholder="Nome do produto"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select
                value={formData.categoryId.toString()}
                onValueChange={(prev) =>
                  setFormData({ ...formData, categoryId: parseInt(prev) })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoryList.length === 0 ? (
                      <SelectItem value="0" disabled>
                        Carregando Lista....
                      </SelectItem>
                    ) : (
                      <SelectItem value="0" disabled>
                        Categoria
                      </SelectItem>
                    )}
                    {categoryList.length > 0 &&
                      categoryList.map((list) => (
                        <SelectItem
                          key={list.categoryId}
                          value={list.categoryId.toString()}
                        >
                          {list.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={formData.unitId.toString()}
                onValueChange={(prev) =>
                  setFormData({ ...formData, unitId: parseInt(prev) })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Unidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {unitList.length === 0 ? (
                      <SelectItem value="0" disabled>
                        Carregando Lista....
                      </SelectItem>
                    ) : (
                      <SelectItem value="0" disabled>
                        Unidade
                      </SelectItem>
                    )}
                    {unitList.length > 0 &&
                      unitList.map((list) => (
                        <SelectItem
                          key={list.unitId}
                          value={list.unitId.toString()}
                        >
                          {list.name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex h-full items-end justify-between gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="minStock">Quantidade Mínima em estoque</Label>
                <Input
                  id="minStock"
                  placeholder="exemplo: 10"
                  value={formData.minStock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minStock: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <Button type="submit">Salvar</Button>
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
