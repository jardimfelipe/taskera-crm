"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const Sidebar = () => {
  const params = useParams<{ id: string; }>()
  const menus = [
    {
      label: "Resumo do projeto",
      href: `/projects/${params.id}`,
    },
    {
      label: "Kanban",
      href: `/projects/${params.id}/kanban`,
    },
  ]
  return (
    <aside
      className="z-40 w-60"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col gap-4">
        {
          menus.map((menu) => (
            <Button
              key={menu.href}
              asChild
              variant="ghost"
              className="w-full justify-start text-muted-foreground font-normal text-sm"
            >
              <Link href={menu.href}>
                {menu.label}
              </Link>
            </Button>
          ))
        }
      </div>
    </aside>
  );
};

export default Sidebar;
