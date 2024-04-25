import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SupplierTable from "@/components/registration/supplier/table";
import CatAndUnitTable from "@/components/registration/catAndUnit/table";
/* Corrige o erro de prerender-error */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Cadastros() {
  return (
    <Tabs defaultValue="category">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="category">Categorias/Unidades</TabsTrigger>
          <TabsTrigger value="supplier">Fornecedores</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="category">
        <CatAndUnitTable />
      </TabsContent>
      <TabsContent value="supplier">
        <SupplierTable />
      </TabsContent>
    </Tabs>
  );
}
