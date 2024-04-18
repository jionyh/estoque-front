"use client";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useEntryContext } from "../context";

type Props = {
  entryId: number;
};
export default function DetailsButton({ entryId }: Props) {
  const { setEntryId } = useEntryContext();
  const router = useRouter();

  function handleDetails() {
    setEntryId(entryId);
    router.push("/estoque/detalhes");
  }

  return (
    <Button variant="ghost" asChild onClick={handleDetails}>
      <div className="cursor-pointer rounded border p-1 text-green-600">
        <Search size={20} />
      </div>
    </Button>
  );
}
