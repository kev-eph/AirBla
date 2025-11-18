import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

export default function ModuleView() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const moduleId = parseInt(id || "0");

  const { data: module, isLoading: moduleLoading } = trpc.modules.getById.useQuery({ id: moduleId });
  const { data: quizzes, isLoading: quizzesLoading } = trpc.quizzes.getByModule.useQuery({ moduleId });
  const { data: progress } = trpc.progress.getUserProgress.useQuery();

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const utils = trpc.useUtils();
  const submitAnswerMutation = trpc.quizzes.submitAnswer.useMutation();
  const markCompleteMutation = trpc.progress.markComplete.useMutation({
    onSuccess: () => {
      utils.progress.getUserProgress.invalidate();
      toast.success("Módulo concluído com sucesso!");
    },
  });

  if (moduleLoading || quizzesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Módulo não encontrado</CardTitle>
            <CardDescription>O módulo solicitado não existe.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button>Voltar para Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCompleted = progress?.some((p) => p.moduleId === moduleId && p.completed === 1);
  const currentQuiz = quizzes?.[currentQuizIndex];
  const hasQuizzes = quizzes && quizzes.length > 0;

  const handleAnswerSelect = (quizId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: answerIndex });
  };

  const handleSubmitQuiz = async () => {
    if (!currentQuiz || !user) return;

    const selectedAnswer = selectedAnswers[currentQuiz.id];
    if (selectedAnswer === undefined) {
      toast.error("Por favor, selecione uma resposta");
      return;
    }

    const isCorrect = selectedAnswer === currentQuiz.correctAnswer ? 1 : 0;

    try {
      await submitAnswerMutation.mutateAsync({
        quizId: currentQuiz.id,
        answer: selectedAnswer,
        isCorrect,
      });

      setQuizResults({ ...quizResults, [currentQuiz.id]: isCorrect === 1 });

      if (currentQuizIndex < (quizzes?.length || 0) - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
      } else {
        setShowResults(true);
      }
    } catch (error) {
      toast.error("Erro ao enviar resposta");
    }
  };

  const handleCompleteModule = async () => {
    if (!user) return;

    try {
      await markCompleteMutation.mutateAsync({ moduleId });
      setLocation("/dashboard");
    } catch (error) {
      toast.error("Erro ao marcar módulo como concluído");
    }
  };

  const correctAnswersCount = Object.values(quizResults).filter((r) => r).length;
  const totalQuizzes = quizzes?.length || 0;
  const score = totalQuizzes > 0 ? (correctAnswersCount / totalQuizzes) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Module Content */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">Concluído</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <Streamdown>{module.content}</Streamdown>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        {hasQuizzes && !showResults && (
          <Card>
            <CardHeader>
              <CardTitle>
                Quiz - Questão {currentQuizIndex + 1} de {totalQuizzes}
              </CardTitle>
              <CardDescription>Teste seus conhecimentos sobre o conteúdo</CardDescription>
            </CardHeader>
            <CardContent>
              {currentQuiz && (
                <div className="space-y-4">
                  <p className="text-lg font-medium">{currentQuiz.question}</p>
                  <RadioGroup
                    value={selectedAnswers[currentQuiz.id]?.toString()}
                    onValueChange={(value) => handleAnswerSelect(currentQuiz.id, parseInt(value))}
                  >
                    {JSON.parse(currentQuiz.options).map((option: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    onClick={handleSubmitQuiz}
                    disabled={selectedAnswers[currentQuiz.id] === undefined}
                    className="gap-2"
                  >
                    {currentQuizIndex < totalQuizzes - 1 ? "Próxima Questão" : "Finalizar Quiz"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Quiz Results */}
        {showResults && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Resultados do Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl font-bold text-primary mb-4">{score.toFixed(0)}%</div>
                <p className="text-lg text-muted-foreground">
                  Você acertou {correctAnswersCount} de {totalQuizzes} questões
                </p>
              </div>

              <div className="space-y-3">
                {quizzes?.map((quiz, index) => {
                  const isCorrect = quizResults[quiz.id];
                  return (
                    <div
                      key={quiz.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        isCorrect ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="text-sm">Questão {index + 1}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleCompleteModule} className="flex-1" size="lg">
                  Concluir Módulo
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    Voltar para Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Quiz - Complete Button */}
        {!hasQuizzes && (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground mb-4">Você concluiu a leitura deste módulo!</p>
              <Button onClick={handleCompleteModule} size="lg">
                Marcar como Concluído
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
