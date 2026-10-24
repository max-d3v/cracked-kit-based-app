import "@workspace/rpc/orpc/orpc.server";

import "@workspace/ui/globals.css";
import { Toaster } from "@workspace/ui/components/sonner";
import { Providers } from "@/app/providers";

export const metadata = {
  title: "Catolifeito",
  description:
    "Seus trabalhos do Teams escaneados, resolvidos e enviados em seu nome.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
