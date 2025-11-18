import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: modules, isLoading: modulesLoading } = trpc.modules.list.useQuery();
  const { data: progress, isLoading: progressLoading } = trpc.progress.getUserProgress.useQuery();

  if (authLoading || modulesLoading || progressLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Acesso Negado</CardTitle>
            <CardDescription>Você precisa estar autenticado para acessar esta página.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>Voltar para Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const completedModules = progress?.filter((p) => p.completed === 1).length || 0;
  const totalModules = modules?.length || 0;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const isModuleCompleted = (moduleId: number) => {
    return progress?.some((p) => p.moduleId === moduleId && p.completed === 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold text-foreground cursor-pointer hover:text-primary transition-colors">
                AirBLÁ Onboarding
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Olá, {user.name || user.email}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Seu Progresso</CardTitle>
            <CardDescription>
              Você completou {completedModules} de {totalModules} módulos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {progressPercentage.toFixed(0)}% concluído
            </p>
          </CardContent>
        </Card>

        {/* Modules List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Módulos de Onboarding</h2>
          <p className="text-muted-foreground mb-6">
            Complete todos os módulos para conhecer melhor a cultura e processos da AirBLÁ
          </p>
        </div>

        <div className="grid gap-4">
          {modules?.map((module) => {
            const completed = isModuleCompleted(module.id);
            return (
              <Card key={module.id} className={completed ? "border-primary/50 bg-accent/5" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {completed ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                    <Link href={`/module/${module.id}`}>
                      <Button variant={completed ? "outline" : "default"} className="gap-2">
                        {completed ? "Revisar" : "Começar"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration} minutos</span>
                    </div>
                    {completed && (
                      <span className="text-primary font-medium">✓ Concluído</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {progressPercentage === 100 && (
          <Card className="mt-8 bg-primary/10 border-primary">
            <CardHeader>
              <CardTitle className="text-primary">🎉 Parabéns!</CardTitle>
              <CardDescription>
                Você completou todos os módulos de onboarding! Bem-vindo oficialmente à equipe AirBLÁ.
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </main>
    </div>
  );
}
