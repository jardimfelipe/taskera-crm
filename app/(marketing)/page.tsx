import React from "react";
import Link from "next/link";
import { Medal } from "lucide-react";

import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center jusity-center flex-col">
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-md font-medium">
          <Medal className="h-6 w-6 mr-2" />O melhor gerenciador de tarefas
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskera ajuda seu time a progredir
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-blue-600 to to-blue-800 text-white px-4 p-2 rounded-md pb-4 w-fit">
          Pra frente
        </div>
        <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
          Colabore, gerencie projetos e alcance novas metas de produtividade. De
          escritórios a home offices, o jeito que seu time trabalha é único -
          conquiste tudo com Taskera.
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Use Taskera de graça</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
