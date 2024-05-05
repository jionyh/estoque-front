"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ApiFunctions } from "@/types/apiFunctions";

type Props = {
  apiFn: ApiFunctions;
};

export default function LoginForm({ apiFn }: Props) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const loggedUser = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: `/`,
    });
    if (!loggedUser?.error && loggedUser?.ok) {
      //const res = await apiFn.user.login({ email, password });
      //console.log(res);
      //console.log("logged", loggedUser);
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Recuperar senha
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            ref={passwordRef}
            placeholder="Digite sua senha"
            type="password"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
