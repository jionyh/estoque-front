import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./form";
import api from "@/api";

export default function Login() {
  return (
    <Card className="m-auto max-w-sm p-12 py-20">
      <CardHeader>
        <CardTitle className="text-2xl">Controle de Estoque</CardTitle>
      </CardHeader>
      <CardContent className="">
        <LoginForm apiFn={api}/>
      </CardContent>
    </Card>
  );
}
