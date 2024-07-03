import { CircuitBoard, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const Sidebar = async () => {
  const session = await auth();
  return (
    <Suspense fallback={<Sidebar.Skeleton />}>
      <aside
        className="fixed top-0 left-0 z-40 w-60 bg-white h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-400 text-md"
          >
            <Link href="/dashboard">
              <HomeIcon className="w-7 h-7 mr-2" />
              Home
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-400 text-md"
          >
            <Link href="/boards">
              <CircuitBoard className="w-7 h-7 mr-2" />
              Boards
            </Link>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="w-full justify-start text-gray-400 text-md"
          >
            <Link href="/teams">
              <Settings className="w-7 h-7 mr-2" />
              Configurações
            </Link>
          </Button>
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
