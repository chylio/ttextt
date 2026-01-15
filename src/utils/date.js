export const todayISO = () => new Date().toISOString().split("T")[0];

export const addDaysISO = (days) =>
  new Date(Date.now() + days * 86400000).toISOString().split("T")[0];

export const calcIntervalDays = (startISO, endISO) => {
  const start = new Date(startISO);
  const end = new Date(endISO);
  return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
};
