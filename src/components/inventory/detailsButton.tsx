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
    <Button onClick={handleDetails} variant="outline" size="icon">
      <Search size={20} className="text-primary" />
    </Button>
  );
}
