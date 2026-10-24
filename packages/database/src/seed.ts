import "dotenv/config";
import { db } from "./client";
import { assignment, user } from "./schema";

const DAY_MS = 24 * 60 * 60 * 1000;

const daysFromNow = (days: number) => new Date(Date.now() + days * DAY_MS);

/**
 * Seeds a handful of assignments for every existing user.
 * The app's "Sincronizar com Teams" button fills in the full demo set.
 */
async function seed() {
  console.log("🌱 Seeding database...");

  try {
    const users = await db.select({ id: user.id }).from(user);

    const rows = users.flatMap(({ id: userId }) => [
      {
        userId,
        title: "Lista 3 — Derivadas",
        subject: "Matemática",
        classroom: "Cálculo I — Turma B",
        teacher: "Prof.ª Ana Ribeiro",
        instructions: "Resolva as 12 questões da lista anexa.",
        status: "solving" as const,
        progress: 64,
        dueDate: daysFromNow(1),
      },
      {
        userId,
        title: "Relatório de laboratório: pêndulo simples",
        subject: "Física",
        classroom: "Física Experimental I",
        teacher: "Prof. Carlos Menezes",
        instructions: "Elabore o relatório do experimento do pêndulo simples.",
        solution: "Pelo ajuste linear de T² × L obtivemos g = 9,74 m/s².",
        status: "review" as const,
        progress: 100,
        dueDate: daysFromNow(2),
      },
      {
        userId,
        title: "Exercícios de estequiometria",
        subject: "Química",
        classroom: "Química Geral",
        teacher: "Prof. Roberto Lima",
        instructions: "Resolva os 10 exercícios de estequiometria.",
        solution: "10 exercícios resolvidos.",
        status: "graded" as const,
        progress: 100,
        grade: "9,5",
        dueDate: daysFromNow(-4),
        submittedAt: daysFromNow(-5),
      },
    ]);

    if (rows.length === 0) {
      console.log("No users found — sign up first, then run the seed again.");
      return;
    }

    const created = await db
      .insert(assignment)
      .values(rows)
      .onConflictDoNothing()
      .returning();
    console.log(
      `✅ Created ${created.length} assignments for ${users.length} users`
    );
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    console.log("✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Failed to seed database:", error);
    process.exit(1);
  });
