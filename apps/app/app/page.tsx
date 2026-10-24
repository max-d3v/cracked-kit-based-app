import { Show } from "@workspace/ui/components/auth/custom/show";
import { UserButton } from "@workspace/ui/components/auth/user/user-button";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function RootPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="mb-8 flex flex-col items-center gap-4">
        <span className="font-bold text-2xl tracking-tight">CATOLIFEITO</span>
        <h1 className="text-center font-bold text-4xl">
          Seus trabalhos do Teams, já feitos.
        </h1>
        <p className="max-w-md text-center text-lg text-muted-foreground">
          Conecte seu Microsoft Teams e a gente escaneia, resolve e envia suas
          tarefas em seu nome.
        </p>
      </div>

      <div className="flex gap-4">
        <Show when="signed-out">
          <Link href="/login">
            <Button>Entrar</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Criar conta</Button>
          </Link>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>

      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>Catolifeito não é afiliado à Microsoft.</p>
      </div>
    </div>
  );
}
