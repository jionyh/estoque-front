"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  type?: "Categoria" | "Unidade";
  edit?: boolean;
  data?: string;
};

export default function CatAndUnitForm({
  type = "Categoria",
  data,
  edit,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (edit && data) {
      setName(data);
    }
  }, []);

  return (
    <form className={cn("grid items-start gap-3")}>
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
  );
}
