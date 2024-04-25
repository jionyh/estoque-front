import api from "@/api";
import TabelaDetalhes from "@/components/inventoryDetails/table";

export default function Detalhes() {
  return (
    <div>
      <TabelaDetalhes apiFn={api} />
    </div>
  );
}
