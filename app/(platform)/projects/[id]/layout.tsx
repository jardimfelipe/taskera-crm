import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropsWithChildren } from "react";
import Sidebar from "./_components/sidebar";

const menus = [
  {
    label: "Resumo do projeto",
    href: "",
  },
  {
    label: "Kanban",
    href: "/kanban",
  },
]


const Layout = async ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
