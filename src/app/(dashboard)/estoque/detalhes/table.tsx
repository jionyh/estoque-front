"use client";
import Image from "next/image";
import {
  ChevronLeft,
  MoreHorizontal,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEntryContext } from "@/components/context";
import { useEffect, useState } from "react";
import { ApiFunctions } from "@/types/apiFunctions";
import { InventoryItem } from "@/types/inventory";
import { useRouter } from "next/navigation";
import InventoryChart from "@/components/charts/inventoryChart";
import { formatDate } from "@/utils/formatDate";

type Props = {
  apiFn: ApiFunctions;
};

export default function TabelaDetalhes({ apiFn }: Props) {
  const router = useRouter();
  const { entryId } = useEntryContext();
  const [inventoryData, setInventoryData] = useState<InventoryItem>();
  const getData = async () => {
    if (!entryId) return;
    const res = await apiFn.inventoryEntry.get(entryId.toString());
    setInventoryData(res.data[0]);
  };

  function generateChartdata() {
    if (!inventoryData) return [{ date: "", quantity: 0 }];
    let currentQuantity = 0;
    const chartData: Array<{ date: string | null; quantity: number }> = [];

    inventoryData.inventoryEntries.forEach((entry) => {
      if (entry.type === "IN") {
        currentQuantity += entry.quantity;
      } else if (entry.type === "OUT") {
        currentQuantity -= entry.quantity;
      }
      chartData.push({
        date: formatDate(entry.date),
        quantity: currentQuantity,
      });
    });
    return chartData;
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!inventoryData ? (
        <Card>
          <CardContent>Carregando...</CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  size="icon"
                >
                  <ChevronLeft />
                </Button>
                {inventoryData.name}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Data Entrada</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Validade
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Usuario
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Fornecedor
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.inventoryEntries.length > 0 ? (
                  inventoryData.inventoryEntries.map((entry) => (
                    <TableRow key={entry.entryId}>
                      <TableCell className="text-center">
                        {entry.type === "IN" ? (
                          <Badge className="bg-green-600 hover:bg-green-600"></Badge>
                        ) : (
                          <Badge className="bg-red-600 hover:bg-red-600"></Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatDate(entry.date)}
                      </TableCell>
                      <TableCell className="">{entry.quantity}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {entry.expiryDate ? formatDate(entry.expiryDate) : "-"}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {" "}
                        {entry.addedBy}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {entry.supplier}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <h1>carregando dados...</h1>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="grid">
            <div className=" grid items-center justify-items-stretch gap-3 md:grid-cols-2">
              <div className="flex-1">
                <span className="block pb-2 text-sm text-muted-foreground">
                  Estoque atual:
                </span>
                <span className="text-right text-4xl font-semibold leading-none tracking-tight">
                  {inventoryData.quantity}
                </span>
              </div>
              <div className="flex h-44 items-center justify-end p-2 md:h-56">
                <InventoryChart data={generateChartdata()} />
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
