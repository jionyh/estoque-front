import api from "@/api";
import TabelaDetalhes from "@/components/inventoryDetails/table";
/* Corrige o erro de prerender-error */
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Detalhes() {
  return (
    <div>
      <TabelaDetalhes apiFn={api} />
    </div>
  );
}
