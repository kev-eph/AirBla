import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { BookOpen, Users, Zap, Target, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
            <h1 className="text-xl font-bold text-foreground">{APP_TITLE}</h1>
          </div>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Ir para Dashboard</Button>
              </Link>
            ) : (
              <Button asChild>
                <a href={getLoginUrl()}>Entrar</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Bem-vindo à AirBLÁ!
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sua jornada de integração começa aqui. Conheça nossa cultura, valores e metodologias
            através de uma experiência interativa e envolvente.
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Começar Agora <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button size="lg" asChild className="gap-2">
              <a href={getLoginUrl()}>
                Começar Agora <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Por que nosso onboarding é diferente?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Conteúdo Interativo</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Aprenda sobre nossa cultura através de módulos dinâmicos e envolventes
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Metodologias Ágeis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Entenda como aplicamos Scrum e Design Thinking no dia a dia
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Diversidade & Inclusão</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Conheça nosso compromisso com um ambiente diverso e acolhedor
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Acompanhamento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Visualize seu progresso e complete quizzes para validar seu aprendizado
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Pronto para começar sua jornada?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Junte-se a centenas de colaboradores que já passaram pelo nosso processo de onboarding
            e estão fazendo a diferença na AirBLÁ.
          </p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg" variant="default">
                Acessar Plataforma
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="default" asChild>
              <a href={getLoginUrl()}>Fazer Login</a>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 AirBLÁ. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
