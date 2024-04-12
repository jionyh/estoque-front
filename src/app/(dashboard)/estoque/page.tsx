import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryTable from "@/components/inventory/inventoryTable";
import InventoryModal from "@/components/inventory/modal";
import InventoryForm from "@/components/inventory/inventoryForm";
import api from "@/api";

export default async function Inventory() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Todo</TabsTrigger>
          <TabsTrigger value="active">Recente</TabsTrigger>
          <TabsTrigger value="draft">Em baixa</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <InventoryModal>
            <InventoryForm apiFn={api} />
          </InventoryModal>
        </div>
      </div>
      <TabsContent value="all">
        <InventoryTable />
      </TabsContent>
    </Tabs>
  );
}