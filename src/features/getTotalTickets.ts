type Category = {
  amount: number;
};

export const getTotalTickets = (categories: Category[] | undefined) => {
  if (!categories) return;

  const numbers = categories.map((c) => c.amount);

  return numbers.reduce((p1, p2) => p1 + p2);
};
