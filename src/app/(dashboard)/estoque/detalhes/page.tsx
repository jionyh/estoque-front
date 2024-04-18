"use client";

import { useEntryContext } from "@/components/context";

export default function Detalhes() {
  const { entryId } = useEntryContext();
  return <h1>Detalhes {entryId}</h1>;
}
