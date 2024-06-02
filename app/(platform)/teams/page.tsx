import React from "react";

import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const HomePage = async () => {
  return (
    <main className="w-full h-screen pl-60 flex flex-col space-y-4 items-center justify-center">
      <div>Usuario</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sair</Button>
      </form>
    </main>
  );
};

export default HomePage;