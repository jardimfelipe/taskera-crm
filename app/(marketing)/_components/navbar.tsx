"use server";

import { auth, signIn } from "@/auth";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:bloc md:w-auto flex items-center justify-between w-full">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit">Comece a usar</Button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
