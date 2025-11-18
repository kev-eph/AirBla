import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Routers para funcionalidades de onboarding
  modules: router({
    list: publicProcedure.query(async () => {
      const { getAllModules } = await import('./db');
      return getAllModules();
    }),
    getById: publicProcedure
      .input((val: unknown) => {
        if (typeof val === 'object' && val !== null && 'id' in val && typeof val.id === 'number') {
          return { id: val.id };
        }
        throw new Error('Invalid input');
      })
      .query(async ({ input }) => {
        const { getModuleById } = await import('./db');
        return getModuleById(input.id);
      }),
  }),

  progress: router({
    getUserProgress: protectedProcedure.query(async ({ ctx }) => {
      const { getUserProgress } = await import('./db');
      return getUserProgress(ctx.user.id);
    }),
    markComplete: protectedProcedure
      .input((val: unknown) => {
        if (typeof val === 'object' && val !== null && 'moduleId' in val && typeof val.moduleId === 'number') {
          return { moduleId: val.moduleId };
        }
        throw new Error('Invalid input');
      })
      .mutation(async ({ ctx, input }: { ctx: any; input: { moduleId: number } }) => {
        const { markModuleComplete } = await import('./db');
        await markModuleComplete(ctx.user.id, input.moduleId);
        return { success: true };
      }),
  }),

  quizzes: router({
    getByModule: publicProcedure
      .input((val: unknown) => {
        if (typeof val === 'object' && val !== null && 'moduleId' in val && typeof val.moduleId === 'number') {
          return { moduleId: val.moduleId };
        }
        throw new Error('Invalid input');
      })
      .query(async ({ input }) => {
        const { getQuizzesByModule } = await import('./db');
        return getQuizzesByModule(input.moduleId);
      }),
    submitAnswer: protectedProcedure
      .input((val: unknown) => {
        if (
          typeof val === 'object' &&
          val !== null &&
          'quizId' in val &&
          typeof val.quizId === 'number' &&
          'answer' in val &&
          typeof val.answer === 'number' &&
          'isCorrect' in val &&
          typeof val.isCorrect === 'number'
        ) {
          return { quizId: val.quizId, answer: val.answer, isCorrect: val.isCorrect };
        }
        throw new Error('Invalid input');
      })
      .mutation(async ({ ctx, input }: { ctx: any; input: { quizId: number; answer: number; isCorrect: number } }) => {
        const { submitQuizAnswer } = await import('./db');
        await submitQuizAnswer(ctx.user.id, input.quizId, input.answer, input.isCorrect);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
