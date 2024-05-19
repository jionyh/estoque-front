import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Plus, Minus, Search, ArrowUpRight } from "lucide-react";
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
import RemoveInventoryButton from "./removeButton";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  dashboard?: boolean;
};

export default async function InventoryTable({ dashboard = false }: Props) {
  const inventoryList = await api.inventoryEntry.getAll();
  return (
    <Card className={`${dashboard && "xl:col-span-2"}`}>
      {dashboard ? <DashboardTitle /> : <DefaultTitle />}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Estoque</TableHead>
              {!dashboard && (
                <>
                  <TableHead className="hidden md:table-cell">
                    Validade
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Ações</span>
                  </TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryList.data.length > 0 ? (
              inventoryList.data.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="md:table-cell">
                    {item.quantity}
                  </TableCell>
                  {!dashboard && (
                    <>
                      <TableCell className="hidden text-center md:table-cell">
                        {item.expiryDate ? formatDate(item.expiryDate) : "-"}
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex justify-center gap-1 md:gap-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="hover:scale-95 ">
                                <DetailsButton entryId={item.productId} />
                              </TooltipTrigger>
                              <TooltipContent>Visualizar</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className=" hover:scale-95">
                                <RemoveInventoryButton
                                  data={item}
                                  apiFn={api}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Remover Estoque</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <p>Não há registros para exibir</p>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

const DashboardTitle = () => {
  return (
    <CardHeader className="flex flex-row items-center">
      <div className="grid gap-2">
        <CardTitle>Estoque atual</CardTitle>
        <CardDescription>Resumo estoque</CardDescription>
      </div>
      <Button asChild size="sm" className="ml-auto gap-1">
        <Link href="/estoque">
          Ver detalhes estoque
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </CardHeader>
  );
};

const DefaultTitle = () => {
  return (
    <CardHeader>
      <CardTitle>Estoque</CardTitle>
    </CardHeader>
  );
};
