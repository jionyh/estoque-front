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
import { Product, ProductCreate } from "@/types/product";
import { Unit } from "@/types/unit";
import { Category } from "@/types/category";
import ComboSelect from "../comboSelect";

type Props = {
  edit?: boolean;
  data?: Product;
  apiFn: ApiFunctions;
};
const initialFormData = {
  name: "",
  category: { id: "", name: "" },
  unit: { id: "", name: "" },
};

export default function ProductModal({ edit = false, data, apiFn }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialFormData.category,
  );
  const [selectedUnit, setSelectedUnit] = useState(initialFormData.unit);
  const [productName, setProductName] = useState(initialFormData.name);
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
      name: productName,
      categoryId: parseInt(selectedCategory.id),
      unitId: parseInt(selectedUnit.id),
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
      setProductName(initialFormData.name);
      setSelectedCategory(initialFormData.category);
      setSelectedUnit(initialFormData.unit);
      setOpen(false);
    }
  };

  const createFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading(`Criando Produto...`);
    const res = await apiFn.product.create({
      name: productName,
      categoryId: parseInt(selectedCategory.id),
      unitId: parseInt(selectedUnit.id),
    });

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
      setProductName(initialFormData.name);
      setSelectedCategory(initialFormData.category);
      setSelectedUnit(initialFormData.unit);
      setOpen(false);
    }
  };

  useEffect(() => {
    getLists();
  }, []);

  useEffect(() => {
    if (edit && data) {
      setProductName(data.name);
      setSelectedCategory({
        id: data.category.categoryId.toString(),
        name: data.category.name,
      });
      setSelectedUnit({
        id: data.unit.unitId.toString(),
        name: data.unit.name,
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
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ComboSelect
                type="category"
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                data={categoryList.map((cat) => {
                  return { id: cat.categoryId.toString(), name: cat.name };
                })}
              />
              <ComboSelect
                type="unit"
                selected={selectedUnit}
                setSelected={setSelectedUnit}
                data={unitList.map((unit) => {
                  return { id: unit.unitId.toString(), name: unit.name };
                })}
              />
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
      <DrawerContent
        onInteractOutside={(e) => e.preventDefault()}
        className="p-2"
      >
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
                autoComplete="off"
                className="focus-visible:ring-transparent"
                placeholder="Nome do produto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ComboSelect
                type="category"
                selected={selectedCategory}
                setSelected={setSelectedCategory}
                data={categoryList.map((cat) => {
                  return { id: cat.categoryId.toString(), name: cat.name };
                })}
              />
              <ComboSelect
                type="unit"
                selected={selectedUnit}
                setSelected={setSelectedUnit}
                data={unitList.map((unit) => {
                  return { id: unit.unitId.toString(), name: unit.name };
                })}
              />
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
