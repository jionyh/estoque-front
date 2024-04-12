import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import api from "@/api";

export default async function SupplierTable() {
  const supplierList = await api.supplier.getAll();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fornecedores</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {supplierList.data.map((supplier) => (
              <TableRow key={supplier.supplierId}>
                <TableCell className="font-medium">{supplier.name}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {supplier.email}
                </TableCell>
                <TableCell align="right">
                  <div className="flex justify-center gap-1 md:gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="cursor-pointer rounded border p-1 text-blue-600">
                            <Pencil size={20} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Editar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="cursor-pointer rounded border p-1 text-red-600">
                            <Trash2 size={20} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Deletar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
