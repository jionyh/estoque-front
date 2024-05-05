import { Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import DeleteButton from "@/components/registration/catAndUnit/deleteButton";

export default async function CatAndUnitTable() {
  const categoryList = await api.category.getAll();
  const unitList = await api.unit.getAll();

  return (
    <div className="grid gap-1 sm:grid-cols-1 sm:gap-8 md:grid-cols-2">
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Categorias</CardTitle>
            <CatAndUnitModal apiFn={api} />
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
              {categoryList.data.length > 0 ? (
                categoryList.data.map((cat) => (
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
                              <CatAndUnitModal
                                edit
                                data={{ id: cat.categoryId, name: cat.name }}
                                apiFn={api}
                              />
                            </TooltipTrigger>
                            <TooltipContent>Editar</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <DeleteButton
                                data={{ id: cat.categoryId, name: cat.name }}
                                apiFn={api}
                              />
                            </TooltipTrigger>
                            <TooltipContent>Deletar</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <div>carregando...</div>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Unidades</CardTitle>
            <CatAndUnitModal type="Unidade" apiFn={api} />
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
                            <CatAndUnitModal
                              edit
                              type="Unidade"
                              data={{ id: unit.unitId, name: unit.name }}
                              apiFn={api}
                            />
                          </TooltipTrigger>
                          <TooltipContent>Editar</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <DeleteButton
                              type="Unidade"
                              data={{ id: unit.unitId, name: unit.name }}
                              apiFn={api}
                            />
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
