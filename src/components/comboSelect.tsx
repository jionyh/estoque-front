"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";

type SelectedState = {
  id: string;
  name: string;
};

type Props = {
  data: Array<{ id: string; name: string }>;
  type: "product" | "category" | "supplier" | "unit";
  selected: SelectedState;
  setSelected: React.Dispatch<React.SetStateAction<SelectedState>>;
};

interface ComboProps extends Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialSelected = { id: "", name: "" };
const placeholderText = {
  product: "Selecione o Produto...",
  category: "Selecione a Categoria...",
  supplier: "Selecione o Fornecedor",
  unit: "Selecione a Unidade",
};
const notFoundText = {
  product: "Produto não encontrado",
  category: "Categoria não encontrada",
  supplier: "Fornecedor não encontrado",
  unit: "Unidade não encontrada",
};
const foundText = {
  product: "Busque pelo Produto...",
  category: "Busque pela Categoria...",
  supplier: "Busque pelo Fornecedor",
  unit: "Busque pela Unidade",
};

export default function ComboSelect({
  data,
  type,
  selected,
  setSelected,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between"
          >
            {selected.id
              ? data.find((data) => data.name === selected.name)?.name
              : placeholderText[type]}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <CommandBox
            data={data}
            selected={selected}
            setSelected={setSelected}
            type={type}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selected.id
            ? data.find((data) => data.name === selected.name)?.name
            : placeholderText[type]}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <CommandBox
            data={data}
            selected={selected}
            setSelected={setSelected}
            type={type}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function CommandBox({
  data,
  selected,
  setSelected,
  type,
  setOpen,
}: ComboProps) {
  return (
    <Command>
      <CommandInput placeholder={foundText[type]} />
      <CommandEmpty>{notFoundText[type]}</CommandEmpty>
      <CommandGroup>
        <CommandList>
          {data.map((data) => (
            <CommandItem
              key={data.id}
              value={data.name}
              onSelect={(currentName) => {
                setSelected(
                  currentName === selected.name
                    ? initialSelected
                    : { id: data.id, name: currentName },
                );
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selected.id === data.id ? "opacity-100" : "opacity-0",
                )}
              />
              {data.name}
            </CommandItem>
          ))}
        </CommandList>
      </CommandGroup>
    </Command>
  );
}
