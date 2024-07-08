import React, { PropsWithChildren } from "react";

import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <div className="ml-60 overflow-hidden">
        <Header />
        <main className="w-full h-[calc(100vh-3.5rem)] mt-14 p-4">
          <ScrollArea className="rounded-3xl overflow-auto bg-slate-100 h-full p-4">
            {children}
          </ScrollArea>
        </main>
      </div>
    </>
  );
};

export default Layout;
