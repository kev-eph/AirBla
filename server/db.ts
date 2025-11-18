import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Queries para módulos
export async function getAllModules() {
  const db = await getDb();
  if (!db) return [];
  const { modules } = await import("../drizzle/schema");
  return db.select().from(modules).where(eq(modules.isActive, 1)).orderBy(modules.order);
}

export async function getModuleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const { modules } = await import("../drizzle/schema");
  const result = await db.select().from(modules).where(eq(modules.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Queries para progresso do usuário
export async function getUserProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];
  const { userProgress } = await import("../drizzle/schema");
  return db.select().from(userProgress).where(eq(userProgress.userId, userId));
}

export async function markModuleComplete(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return;
  const { userProgress } = await import("../drizzle/schema");
  const { and } = await import("drizzle-orm");
  
  const existing = await db.select().from(userProgress)
    .where(and(
      eq(userProgress.userId, userId),
      eq(userProgress.moduleId, moduleId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    await db.update(userProgress)
      .set({ completed: 1, completedAt: new Date() })
      .where(eq(userProgress.id, existing[0].id));
  } else {
    await db.insert(userProgress).values({
      userId,
      moduleId,
      completed: 1,
      completedAt: new Date(),
    });
  }
}

// Queries para quizzes
export async function getQuizzesByModule(moduleId: number) {
  const db = await getDb();
  if (!db) return [];
  const { quizzes } = await import("../drizzle/schema");
  return db.select().from(quizzes).where(eq(quizzes.moduleId, moduleId));
}

export async function submitQuizAnswer(userId: number, quizId: number, answer: number, isCorrect: number) {
  const db = await getDb();
  if (!db) return;
  const { quizAnswers } = await import("../drizzle/schema");
  
  await db.insert(quizAnswers).values({
    userId,
    quizId,
    answer,
    isCorrect,
  });
}

export async function getUserQuizAnswers(userId: number, quizId: number) {
  const db = await getDb();
  if (!db) return [];
  const { quizAnswers } = await import("../drizzle/schema");
  const { and } = await import("drizzle-orm");
  return db.select().from(quizAnswers)
    .where(and(
      eq(quizAnswers.userId, userId),
      eq(quizAnswers.quizId, quizId)
    ));
}
