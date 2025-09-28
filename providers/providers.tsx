"use client";

import { SessionProvider, useSession } from "@/components/context/SessionContext";
import { AdminEditProvider } from "@/components/context/AdminEditContext";
import HomePageProvider from "@/components/home/home.provider";
import { WorkProvider } from "@/components/work/work.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

function AppProviders({ children }: { children: React.ReactNode }) {
  const { user } = useSession();
  const isAdmin = user?.role === 'admin';
  
  return (
    <AdminEditProvider isAdmin={isAdmin}>
      {children}
    </AdminEditProvider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppProviders>
          <Toaster position="top-right" />
          <HomePageProvider>
            <WorkProvider>{children}</WorkProvider>
          </HomePageProvider>
        </AppProviders>
      </SessionProvider>
    </QueryClientProvider>
  );
}
