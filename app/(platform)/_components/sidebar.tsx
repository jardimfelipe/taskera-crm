import { HomeIcon, Settings, UsersRound } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React, { Suspense } from "react";

import { auth } from "@/auth";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const menus = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/home",
  },
  {
    label: "Clientes",
    icon: UsersRound,
    href: "/clients",
  },
  {
    label: "Projetos",
    icon: Settings,
    href: "/projects",
  },
]

export const Sidebar = async () => {
  const session = await auth();
  return (
    <Suspense fallback={<Sidebar.Skeleton />}>
      <aside
        className="fixed top-0 left-0 z-40 w-60 bg-white h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="mt-4 pl-4 mb-10">
          <Logo />
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto flex flex-col gap-4">
          {
            menus.map((menu) => (
              <Button
                key={menu.href}
                asChild
                variant="ghost"
                className="w-full justify-start text-black text-sm"
              >
                <Link href={menu.href}>
                  <menu.icon className="w-6 h-6 mr-2 text-primary" />
                  {menu.label}
                </Link>
              </Button>
            ))
          }
        </div>
      </aside>
    </Suspense>
  );
};

Sidebar.Skeleton = function SkeletonNav() {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-60 bg-white border border-l h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex mt-5 items-center space-x-4 w-full">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div className="mt-40 flex flex-col space-y-4">
          <div className="flex items-center space-x-4 w-full">
            <Skeleton className="h-12 w-12 aspect-square" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full">
            <Skeleton className="h-12 w-12 aspect-square" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          <div className="flex items-center space-x-4 w-full">
            <Skeleton className="h-12 w-12 aspect-square" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
