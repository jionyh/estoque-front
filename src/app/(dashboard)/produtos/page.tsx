import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductModal from "@/components/product/modal";
import ProductForm from "@/components/product/productForm";
import api from "@/api";
import ProductTable from "@/components/product/productTable";

export default function Products() {
  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">Todo</TabsTrigger>
          <TabsTrigger value="active">Recente</TabsTrigger>
          <TabsTrigger value="draft">Sem Estoque</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <ProductModal>
            <ProductForm apiFn={api} />
          </ProductModal>
        </div>
      </div>
      <TabsContent value="all">
        <ProductTable />
      </TabsContent>
    </Tabs>
  );
}
