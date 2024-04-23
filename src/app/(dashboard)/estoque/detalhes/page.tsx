import api from "@/api";
import TabelaDetalhes from "./table";

export default function Detalhes() {
  return (
    <div>
      <TabelaDetalhes apiFn={api} />
    </div>
  );
}
