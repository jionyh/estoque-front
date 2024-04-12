"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { cn } from "@/lib/utils";
import DatePicker from "../datePicker";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Supplier } from "@/types/supplier";
import { Separator } from "../ui/separator";
import { ApiFunctions } from "@/types/apiFunctions";

type Props = {
  apiFn: ApiFunctions;
};

export default function ProductForm({ apiFn }: Props) {
  const [haveValidity, setHaveValidity] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);

  async function getLists() {
    const prodList = await apiFn.product.getAll();
    const supList = await apiFn.supplier.getAll();
    if (prodList.success && supList.success) {
      setProductList(prodList.data);
      setSupplierList(supList.data);
    }
  }
  useEffect(() => {
    getLists();
  }, []);

  return (
    <form className={cn("grid items-start gap-4")}>
      <div className="grid gap-2">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Selecione o produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {productList.length === 0 && (
                <SelectItem value="0" disabled>
                  Carregando Lista....
                </SelectItem>
              )}
              {productList.length > 0 &&
                productList.map((list) => (
                  <SelectItem
                    className="cursor-pointer"
                    value={list.productId.toString()}
                  >
                    {list.name}
                  </SelectItem>
                ))}
              <Separator />
              <SelectItem className="cursor-pointer" value="criar">
                Adicionar Produto
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex h-full items-end justify-between gap-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="quantity">Quantidade</Label>
          <Input id="quantity" />
        </div>
        <div className="grid h-full flex-1 gap-2">
          {haveValidity ? (
            <>
              <Label>Validade</Label>
              <DatePicker />
            </>
          ) : (
            <div className="flex h-full items-end">
              <div className="flex items-center justify-around gap-2">
                <Switch
                  id="validitySwitch"
                  checked={haveValidity}
                  onCheckedChange={() => setHaveValidity(true)}
                />
                <Label htmlFor="validitySwitch">Produto tem validade?</Label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid gap-2">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Selecione o fornecedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {supplierList.length === 0 && (
                <SelectItem value="0" disabled>
                  Carregando Lista....
                </SelectItem>
              )}
              {supplierList.length > 0 &&
                supplierList.map((list) => (
                  <SelectItem value={list.supplierId.toString()}>
                    {list.name}
                  </SelectItem>
                ))}
              <Separator />
              <SelectItem value="criar">Adicionar Fornecedor</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
