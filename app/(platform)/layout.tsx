import { redirect } from "next/navigation";
import React, { PropsWithChildren, Suspense } from "react";

import { auth } from "@/auth";
import { db } from "@/lib/db";

import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";

const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <div className="ml-60 overflow-x-hidden">
        <Header />
        <main className="w-full h-[calc(100vh-3.5rem)] mt-14 p-4">
          <div className="rounded-3xl bg-slate-100 h-full p-4">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
