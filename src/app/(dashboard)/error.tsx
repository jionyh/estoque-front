"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div className="flex w-fit flex-col gap-2">
      <span>Ocorreu um erro!</span>
      <Button size="sm" variant="outline" onClick={() => reset()}>
        Recarregar página
      </Button>
    </div>
  );
}
