export const getMonthQueryString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 2).toISOString().split('T')[0];
  const lastDay = new Date(year, month + 1, 1).toISOString().split('T')[0];

  const queryString = new URLSearchParams({
    startDate: firstDay,
    endDate: lastDay,
  }).toString();

  return { firstDay, lastDay, queryString };
};
