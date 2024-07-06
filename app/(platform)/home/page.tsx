import React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";

import { HoursChart } from "./_components/hours-chart";
import { TaskTable } from "./_components/task-table";

const HomePage = async () => {
  return (
    <div className="flex gap-2">
      <Card>
        <CardHeader>
          <CardTitle>
            Projetos
          </CardTitle>
          <CardDescription>
            Seus projetos mais recentes
          </CardDescription>
        </CardHeader>

        <CardContent>
          <TaskTable />
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader>
          <CardTitle>
            Horas trabalhadas
          </CardTitle>
          <CardDescription>
            Resumo de trabalho da semana
          </CardDescription>
        </CardHeader>

        <CardContent>
          <HoursChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
