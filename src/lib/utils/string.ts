export const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalizedCompare = (a: string, b: string) => {
  return normalizeString(a)
    .toLowerCase()
    .includes(normalizeString(b).toLowerCase());
};
