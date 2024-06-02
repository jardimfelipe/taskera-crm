import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { auth } from "@/auth";

import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";

const Layout = async ({ children }: PropsWithChildren) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <Header />
      <Sidebar user={session.user} />
      {children}
    </div>
  );
};

export default Layout;
