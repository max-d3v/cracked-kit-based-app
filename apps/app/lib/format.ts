const DAY_MS = 24 * 60 * 60 * 1000;

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export const formatDate = (date: Date | string) =>
  dateFormatter.format(new Date(date));

export const formatDateTime = (date: Date | string) =>
  dateTimeFormatter.format(new Date(date));

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

/** "hoje", "amanhã", "em 3 dias", "há 2 dias" */
export const formatRelativeDue = (date: Date | string) => {
  const days = Math.round(
    (startOfDay(new Date(date)) - startOfDay(new Date())) / DAY_MS
  );

  if (days === 0) {
    return "hoje";
  }
  if (days === 1) {
    return "amanhã";
  }
  if (days === -1) {
    return "ontem";
  }
  if (days > 1) {
    return `em ${days} dias`;
  }
  return `há ${Math.abs(days)} dias`;
};

export const isDueSoon = (date: Date | string) => {
  const diff = new Date(date).getTime() - Date.now();
  return diff > 0 && diff < 2 * DAY_MS;
};
