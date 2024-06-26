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
import { Supplier } from "@/types/supplier";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

type Props = {
  data: Supplier;
  apiFn: ApiFunctions;
};

export default function DeleteSupplierButton({ data, apiFn }: Props) {
  const handleDelete = async () => {
    const loadingToast = toast.loading(`Deletando Fornecedor...`);

    const res = await apiFn.supplier.delete(data);

    if (res.success) {
      toast.update(loadingToast, {
        render: `Fornecedor deletado com sucesso!`,
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
              {` Isso irá excluir a Fornecedor: `}
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
