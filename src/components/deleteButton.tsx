"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ApiFunctions } from "@/types/apiFunctions";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  type?: "Categoria" | "Unidade";
  data: { id: number; name: string };
  apiFn: ApiFunctions;
};

export default function DeleteButton({
  type = "Categoria",
  data,
  apiFn,
}: Props) {
  const handleDelete = async () => {
    let res;
    const loadingToast = toast.loading(`Deletando ${type}...`);
    switch (type) {
      case "Categoria":
        res = await apiFn.category.delete(data.id, data.name);
        break;

      case "Unidade":
        res = await apiFn.unit.delete(data.id, data.name);
        break;
    }

    if (res.success) {
      toast.update(loadingToast, {
        render: `${type} deletada com sucesso!`,
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
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="cursor-pointer rounded border p-1 text-red-600">
          <Trash2 size={20} />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="select-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza da exclusão?</AlertDialogTitle>
          <AlertDialogDescription>
            <span>
              {` Isso irá excluir a ${type}: `}
              <span className="text-md block text-pretty font-bold text-destructive">
                {data.name}
              </span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
