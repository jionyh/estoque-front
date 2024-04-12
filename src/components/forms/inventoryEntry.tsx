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
import { useState } from "react";

export default function InventoryEntryForm({
  className,
}: React.ComponentProps<"form">) {
  const [haveValidity, setHaveValidity] = useState(false);
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Select>
          <SelectTrigger className="">
            <SelectValue placeholder="Selecione o produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="01">Papel A4</SelectItem>
              <SelectItem value="02">Rivotril</SelectItem>
              <SelectItem value="03">Remédio</SelectItem>
              <SelectItem value="04">Toalha Papel</SelectItem>
              <SelectItem value="05">Caneta</SelectItem>
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
              <SelectItem value="01">Fulano</SelectItem>
              <SelectItem value="02">Ciclano</SelectItem>
              <SelectItem value="03">Jiony</SelectItem>
              <SelectItem value="04">Meguinha</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Salvar</Button>
    </form>
  );
}
