import type {
  AssignmentStatus,
  CreateAssignmentParams,
} from "@workspace/types/repository/assignments";

/**
 * Simulated Microsoft Teams source used while the real Graph integration
 * doesn't exist. Every "sync" materializes these assignments for the user,
 * with dates relative to now so the UI always looks alive.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

type DemoAssignment = {
  title: string;
  subject: string;
  classroom: string;
  teacher: string;
  instructions: string;
  solution?: string;
  status: AssignmentStatus;
  progress: number;
  grade?: string;
  dueInDays: number;
  submittedDaysAgo?: number;
};

const DEMO_ASSIGNMENTS: DemoAssignment[] = [
  {
    title: "Lista 3 — Derivadas",
    subject: "Matemática",
    classroom: "Cálculo I — Turma B",
    teacher: "Prof.ª Ana Ribeiro",
    instructions:
      "Resolva as 12 questões da lista anexa, mostrando o desenvolvimento completo de cada derivada.",
    status: "solving",
    progress: 64,
    dueInDays: 1,
  },
  {
    title: "Relatório de laboratório: pêndulo simples",
    subject: "Física",
    classroom: "Física Experimental I",
    teacher: "Prof. Carlos Menezes",
    instructions:
      "Elabore o relatório do experimento do pêndulo simples com objetivo, método, tabela de dados, cálculo de g e conclusão.",
    solution:
      "Objetivo: determinar a aceleração da gravidade local a partir do período de um pêndulo simples.\n\nMétodo: medimos 10 oscilações para 5 comprimentos de fio (0,30 m a 1,10 m).\n\nResultado: pelo ajuste linear de T² × L obtivemos g = 9,74 ± 0,08 m/s², com erro relativo de 0,7% em relação ao valor de referência.\n\nConclusão: o modelo de pequenas oscilações descreve bem o sistema; o principal erro vem do tempo de reação na cronometragem.",
    status: "review",
    progress: 100,
    dueInDays: 2,
  },
  {
    title: "Estudo de caso: elasticidade-preço da demanda",
    subject: "Economia",
    classroom: "Microeconomia I",
    teacher: "Prof.ª Beatriz Souza",
    instructions:
      "Calcule a elasticidade-preço da demanda para os dados do caso e explique o impacto de um aumento de 10% no preço.",
    solution:
      "Elasticidade no ponto médio: Ep = −1,8 (demanda elástica).\n\nUm aumento de 10% no preço reduz a quantidade demandada em cerca de 18%, o que diminui a receita total da empresa. Recomendação: manter o preço e competir por diferenciação.",
    status: "review",
    progress: 100,
    dueInDays: 1,
  },
  {
    title: "Algoritmos de ordenação em Python",
    subject: "Programação",
    classroom: "Algoritmos e Programação I",
    teacher: "Prof. Marcos Teixeira",
    instructions:
      "Implemente bubble sort, merge sort e quick sort e compare o tempo de execução para listas de 1.000, 10.000 e 100.000 elementos.",
    status: "solving",
    progress: 22,
    dueInDays: 4,
  },
  {
    title: "Questionário: sistema circulatório",
    subject: "Biologia",
    classroom: "Fisiologia Humana",
    teacher: "Prof.ª Luiza Andrade",
    instructions:
      "Responda ao questionário do Forms vinculado à tarefa (15 questões de múltipla escolha).",
    status: "found",
    progress: 0,
    dueInDays: 6,
  },
  {
    title: "Lista 4 — Integrais",
    subject: "Matemática",
    classroom: "Cálculo I — Turma B",
    teacher: "Prof.ª Ana Ribeiro",
    instructions:
      "Resolva as integrais por substituição e por partes da lista anexa.",
    status: "found",
    progress: 0,
    dueInDays: 8,
  },
  {
    title: "Seminário em grupo — apresentação ao vivo",
    subject: "Filosofia",
    classroom: "Ética e Cidadania",
    teacher: "Prof. Rafael Nunes",
    instructions:
      "Apresentação oral em grupo de 15 minutos durante a aula. Não há entrega de arquivo.",
    status: "failed",
    progress: 0,
    dueInDays: 5,
  },
  {
    title: "Redação: os impactos da IA no mercado de trabalho",
    subject: "Redação",
    classroom: "Comunicação e Expressão",
    teacher: "Prof.ª Juliana Costa",
    instructions:
      "Redação dissertativo-argumentativa de 25 a 30 linhas sobre os impactos da inteligência artificial no mercado de trabalho.",
    solution:
      "A automação sempre transformou o trabalho, mas a inteligência artificial acelera essa mudança como nenhuma tecnologia anterior...\n\n(redação completa com 28 linhas entregue no Teams)",
    status: "submitted",
    progress: 100,
    dueInDays: 3,
    submittedDaysAgo: 1,
  },
  {
    title: "Mapa conceitual: imperativo categórico",
    subject: "Filosofia",
    classroom: "Ética e Cidadania",
    teacher: "Prof. Rafael Nunes",
    instructions:
      "Monte um mapa conceitual sobre o imperativo categórico de Kant e suas três formulações.",
    solution:
      "Mapa conceitual com o conceito central, as três formulações (lei universal, humanidade como fim, reino dos fins) e exemplos de aplicação.",
    status: "submitted",
    progress: 100,
    dueInDays: 2,
    submittedDaysAgo: 2,
  },
  {
    title: "Exercícios de estequiometria",
    subject: "Química",
    classroom: "Química Geral",
    teacher: "Prof. Roberto Lima",
    instructions:
      "Resolva os 10 exercícios de estequiometria, incluindo reagente limitante e rendimento.",
    solution:
      "10 exercícios resolvidos com balanceamento, relação molar e cálculo de rendimento.",
    status: "graded",
    progress: 100,
    grade: "9,5",
    dueInDays: -4,
    submittedDaysAgo: 5,
  },
  {
    title: "Resumo: Revolução Industrial",
    subject: "História",
    classroom: "História Econômica",
    teacher: "Prof.ª Helena Duarte",
    instructions:
      "Resumo de 2 páginas sobre as causas e consequências da Primeira Revolução Industrial.",
    solution:
      "Resumo em 2 páginas cobrindo contexto inglês, máquina a vapor, urbanização e condições de trabalho.",
    status: "graded",
    progress: 100,
    grade: "10",
    dueInDays: -7,
    submittedDaysAgo: 8,
  },
  {
    title: "Lista 2 — Limites",
    subject: "Matemática",
    classroom: "Cálculo I — Turma B",
    teacher: "Prof.ª Ana Ribeiro",
    instructions: "Resolva os 15 limites da lista anexa.",
    solution: "15 limites resolvidos com justificativa de cada passo.",
    status: "graded",
    progress: 100,
    grade: "8,7",
    dueInDays: -12,
    submittedDaysAgo: 13,
  },
];

export const buildDemoAssignments = (
  userId: string,
  existingTitles: Set<string>
): CreateAssignmentParams[] => {
  const now = Date.now();

  return DEMO_ASSIGNMENTS.filter((demo) => !existingTitles.has(demo.title)).map(
    ({ dueInDays, submittedDaysAgo, ...demo }) => ({
      ...demo,
      userId,
      dueDate: new Date(now + dueInDays * DAY_MS),
      submittedAt:
        submittedDaysAgo === undefined
          ? null
          : new Date(now - submittedDaysAgo * DAY_MS),
    })
  );
};
