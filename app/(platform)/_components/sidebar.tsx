import {
  CircuitBoard,
  HomeIcon,
  LayoutList,
  Settings,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { DefaultSession } from "next-auth";
import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  user: DefaultSession["user"];
};

export const Sidebar = ({ user }: Props) => {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-60 bg-white border border-l h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="pt-5 pb-20">
          <h1>{user?.name}</h1>
        </div>
        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-slate-400"
        >
          <Link href="/teams">
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-gray-400"
        >
          <Link href="/teams">
            <CircuitBoard className="w-4 h-4 mr-2" />
            Boards
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          className="w-full justify-start text-gray-400"
        >
          <Link href="/teams">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Link>
        </Button>
      </div>
    </aside>
  );
};
