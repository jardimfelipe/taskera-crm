import React from "react";

import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

const HomePage = async () => {
  const users = await db.user.findMany();

  return (
    <div>
      <div>Usuario</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sair</Button>
      </form>
    </div>
  );
};

export default HomePage;
