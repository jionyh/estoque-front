import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Plus, Minus, Search } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import api from "@/api";
import { formatDate } from "@/utils/formatDate";
import DetailsButton from "./detailsButton";

export default async function InventoryTable() {
  const inventoryList = await api.inventoryEntry.getAll();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead className="hidden md:table-cell">Validade</TableHead>
              <TableHead className="hidden md:table-cell">
                Adicionado em
              </TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryList.data.map((item) => (
              <TableRow key={item.entryId}>
                <TableCell className="font-medium">
                  {item.product.name}
                </TableCell>
                <TableCell className="md:table-cell">{item.quantity}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.expiryDate === null
                    ? "Indeterminada"
                    : formatDate(item.date)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(item.date)}
                </TableCell>
                <TableCell align="right">
                  <div className="flex justify-center gap-1 md:gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="hover:scale-95">
                          <DetailsButton entryId={item.entryId} />
                        </TooltipTrigger>
                        <TooltipContent>Visualizar</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className=" hover:scale-95">
                          <div className="cursor-pointer rounded border p-1 text-blue-600">
                            <Plus size={20} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Adicionar Estoque</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className=" hover:scale-95">
                          <div className="cursor-pointer rounded border p-1 text-red-600">
                            <Minus size={20} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>Remover Estoque</TooltipContent>
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
