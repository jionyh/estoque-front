import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryTable from "@/components/inventory/table";
import InventoryModal from "@/components/inventory/modal";
import api from "@/api";

/* Corrige o erro de prerender-error */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Inventory() {
  const supplierList = await api.supplier.getAll();
  const productList = await api.product.getAll();

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Todo</TabsTrigger>
          <TabsTrigger value="active">Recente</TabsTrigger>
          <TabsTrigger value="draft">Em baixa</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2 p-2">
          <InventoryModal
            productList={productList.data}
            supplierList={supplierList.data}
            apiFn={api}
          />
        </div>
      </div>
      <TabsContent value="all">
        <InventoryTable />
      </TabsContent>
    </Tabs>
  );
}
