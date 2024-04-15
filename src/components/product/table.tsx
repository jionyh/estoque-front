import { Badge } from "../ui/badge";
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
import { Plus, Minus, Search, Trash2, Pencil } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table";
import api from "@/api";
import ProductModal from "./modal";
import DeleteProductButton from "./deleteButton";

export default async function ProductTable() {
  const productsList = await api.product.getAll();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden md:table-cell">Unidade</TableHead>
              <TableHead className="hidden md:table-cell">
                Minimo em Estoque
              </TableHead>
              <TableHead>
                <span className="sr-only">Ações</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productsList.data.map((product) => (
              <TableRow key={product.productId}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category.name}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant="outline">{product.unit.name}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.minStock}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1 md:gap-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className=" hover:scale-95">
                          <ProductModal edit apiFn={api} data={product} />
                        </TooltipTrigger>
                        <TooltipContent>Editar Produto</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className=" hover:scale-95">
                          <DeleteProductButton data={product} apiFn={api} />
                        </TooltipTrigger>
                        <TooltipContent>Deletar Produto</TooltipContent>
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
