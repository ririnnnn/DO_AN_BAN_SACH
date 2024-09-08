export const sortDate = (arraySortDate) => {
  if (!arraySortDate) return [];
  
  return arraySortDate?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};
