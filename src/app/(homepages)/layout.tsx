import { ClientSidebar } from "@/src/components/sidebar/client-sidebar";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex" suppressHydrationWarning={true}>
      <ClientSidebar />
      <div className="flex-1 p-4">{children}</div>
    </main>
  );
}
