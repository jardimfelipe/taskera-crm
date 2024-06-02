import React from "react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <nav className="fixed h-14 flex items-center bottom-0 w-full px-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:bloc md:w-auto flex items-center justify-between w-full">
          <Button variant="ghost" size="sm">
            Políticas de Privacidade
          </Button>
          <Button variant="ghost"> Termos de serviço</Button>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
