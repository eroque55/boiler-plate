export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const normalize = (value: string) => {
  return value.replace(/\D/g, '');
};

export const formatDateToEnUs = (date: string) => {
  const [day, month, year] = date.split('/');

  return `${year}-${month}-${day}`;
};

export const formatDateToPtBr = (date?: string) => {
  if (!date) {
    return '';
  }

  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
};

export const cleanMessage = (message?: string) => {
  if (!message) {
    return '';
  }

  return message.replace(/\s+$/g, '').replace(/\n{3,}/g, '\n\n');
};

export const normalizeSearch = (value: string) => {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

export const matchText = (text: string, search: string) => {
  const normalizedText = normalizeSearch(text);
  const normalizedSearch = normalizeSearch(search);

  return normalizedText.includes(normalizedSearch);
};
