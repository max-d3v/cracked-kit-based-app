import { auth } from "@workspace/auth/auth";
import { headers } from "next/headers";

export async function DashboardWelcome() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const firstName = data?.user.name?.split(" ")[0];

  return (
    <div>
      <h1 className="font-bold text-3xl">
        {firstName ? `Olá, ${firstName}!` : "Olá!"}
      </h1>
      <p className="text-muted-foreground">
        Seus trabalhos do Teams, escaneados, resolvidos e enviados em seu nome.
      </p>
    </div>
  );
}
