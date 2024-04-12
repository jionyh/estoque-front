import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "../charts/barChart";

export default function Dashboardcard() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Estoque Atual</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview />
      </CardContent>
    </Card>
  );
}
