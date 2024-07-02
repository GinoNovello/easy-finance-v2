import { ClientSidebar } from "@/src/components/sidebar/client-sidebar";

export default function HomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <ClientSidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
