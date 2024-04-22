"use client";
import { FormEvent, SetStateAction, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DatePicker from "../datePicker";
import ComboSelect from "@/components/comboSelect";
import { PlusCircle } from "lucide-react";
import { InventoryCreate } from "@/types/inventory";
import { Product } from "@/types/product";
import { Supplier } from "@/types/supplier";
import { toast } from "react-toastify";
import { ApiFunctions } from "@/types/apiFunctions";
import { formatDate, parseDate } from "@/utils/formatDate";

type Props = {
  productList: Product[];
  supplierList: Supplier[];
  apiFn: ApiFunctions;
};

type StateProps = { id: string; name: string };

interface FormProps extends Omit<Props, "apiFn"> {
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  selectedProduct: StateProps;
  setSelectProduct: React.Dispatch<SetStateAction<StateProps>>;
  formData: Omit<InventoryCreate, "entryId">;
  setFormData: React.Dispatch<SetStateAction<Omit<InventoryCreate, "entryId">>>;
  selectedSupplier: StateProps;
  setSelectSupplier: React.Dispatch<SetStateAction<StateProps>>;
}

const initialFormData = {
  productId: 0,
  quantity: 0,
  expiryDate: "",
  supplierId: 0,
};

export default function InventoryModal({
  productList,
  supplierList,
  apiFn,
}: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [formData, setFormData] =
    useState<Omit<InventoryCreate, "entryId">>(initialFormData);
  const [selectedProduct, setSelectedProduct] = useState({ id: "", name: "" });
  const [selectedSupplier, setSelectedSupplier] = useState({
    id: "",
    name: "",
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    //edit ? editFormSubmit(e) : createFormSubmit(e);
    createFormSubmit(e);
  };

  const createFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading(`Criando Produto...`);
    const res = await apiFn.inventoryEntry.create({
      productId: parseInt(selectedProduct.id),
      supplierId: parseInt(selectedSupplier.id),
      quantity: formData.quantity,
      expiryDate: formData.expiryDate,
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
      setFormData(initialFormData);
      setOpen(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Adicionar Estoque
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar ao estoque</DialogTitle>
            <DialogDescription>
              Adicione produtos ao estoque e para finalizar clique em salvar
            </DialogDescription>
          </DialogHeader>
          <Form
            handleFormSubmit={handleFormSubmit}
            selectedProduct={selectedProduct}
            setSelectProduct={setSelectedProduct}
            productList={productList}
            formData={formData}
            setFormData={setFormData}
            selectedSupplier={selectedSupplier}
            setSelectSupplier={setSelectedSupplier}
            supplierList={supplierList}
          ></Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Adicionar Estoque
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-3">
        <DrawerHeader className="p-2 text-left">
          <DrawerTitle>Adicionar ao estoque</DrawerTitle>
          <DrawerDescription>
            Adicione produtos ao estoque e para finalizar clique em salvar
          </DrawerDescription>
        </DrawerHeader>
        <Form
          handleFormSubmit={handleFormSubmit}
          selectedProduct={selectedProduct}
          setSelectProduct={setSelectedProduct}
          productList={productList}
          formData={formData}
          setFormData={setFormData}
          selectedSupplier={selectedSupplier}
          setSelectSupplier={setSelectedSupplier}
          supplierList={supplierList}
        ></Form>
        <DrawerFooter className="px-0 pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function Form({
  handleFormSubmit,
  selectedProduct,
  setSelectProduct,
  productList,
  formData,
  setFormData,
  selectedSupplier,
  setSelectSupplier,
  supplierList,
}: FormProps) {
  const [haveValidity, setHaveValidity] = useState(false);

  return (
    <form onSubmit={handleFormSubmit} className={cn("grid items-start gap-4")}>
      <div className="grid gap-2">
        <ComboSelect
          type="product"
          selected={selectedProduct}
          setSelected={setSelectProduct}
          data={productList.map((prod) => {
            return { id: prod.productId.toString(), name: prod.name };
          })}
        />
      </div>
      <div className="flex h-full items-end justify-between gap-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="quantity">Quantidade</Label>
          <Input
            id="quantity"
            value={formData.quantity.toString()}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value) })
            }
          />
        </div>
        <div className="grid h-full flex-1 gap-2">
          {haveValidity ? (
            <>
              <Label>Validade</Label>
              <DatePicker
                date={parseDate(formData.expiryDate)}
                setDate={(date) =>
                  setFormData({ ...formData, expiryDate: formatDate(date) })
                }
              />
            </>
          ) : (
            <div className="flex h-full items-end">
              <div className="flex flex-1 items-center justify-around gap-2">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => setHaveValidity(true)}
                >
                  Adicionar Validade
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <ComboSelect
          type="supplier"
          selected={selectedSupplier}
          setSelected={setSelectSupplier}
          data={supplierList.map((sup) => {
            return { id: sup.supplierId.toString(), name: sup.name };
          })}
        />
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
