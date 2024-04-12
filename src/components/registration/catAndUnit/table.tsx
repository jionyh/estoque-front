import {
  Delete,
  FilePenIcon,
  FileX2,
  FileX2Icon,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import api from "@/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CatAndUnitModal from "./modal";
import CatAndUnitForm from "./form";

export default async function CatAndUnitTable() {
  const categoryList = await api.category.getAll();
  const unitList = await api.unit.getAll();
  return (
    <div className="grid gap-1 sm:grid-cols-1 sm:gap-8 md:grid-cols-2">
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Categorias</CardTitle>
            <CatAndUnitModal>
              <CatAndUnitForm />
            </CatAndUnitModal>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <span className="sr-only">categorias</span>
                </TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryList.data.map((cat) => (
                <TableRow
                  key={cat.categoryId}
                  className="odd:bg-muted/50 even:bg-muted"
                >
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell align="right">
                    <div className="flex justify-center gap-1 md:gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <CatAndUnitModal edit>
                              <CatAndUnitForm edit data={cat.name} />
                            </CatAndUnitModal>
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
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Unidades</CardTitle>
            <CatAndUnitModal type="Unidade">
              <CatAndUnitForm type="Unidade" />
            </CatAndUnitModal>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <span className="sr-only">Unidade</span>
                </TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unitList.data.map((unit) => (
                <TableRow
                  key={unit.unitId}
                  className="odd:bg-muted/50 even:bg-muted"
                >
                  <TableCell className="font-medium">{unit.name}</TableCell>
                  <TableCell align="right">
                    <div className="flex justify-center gap-1 md:gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <CatAndUnitModal edit>
                              <CatAndUnitForm edit data={unit.name} />
                            </CatAndUnitModal>
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
      </Card>
    </div>
  );
}
