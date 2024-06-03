import { redirect } from "next/navigation";
import React, { PropsWithChildren, Suspense } from "react";

import { auth } from "@/auth";
import { db } from "@/lib/db";

import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }
  console.log(session);
  return (
    <Suspense fallback={<p>To vendo se tem usuário</p>}>
      <Header />
      <Sidebar user={session.user} />
      {children}
    </Suspense>
  );
};

export default Layout;
