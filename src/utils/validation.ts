import { isValid, parse } from 'date-fns';

import { zipCodeService } from '@/services/api/cep';

export const validateDate = (
  date: string,
  minimumYear?: number,
  maximumYear?: number,
): boolean => {
  if (!date || !date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return false;
  }

  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

  if (!isValid(parsedDate)) {
    return false;
  }

  const maxYear = maximumYear || new Date().getFullYear() + 200;
  const minYear = minimumYear || new Date().getFullYear() - 200;

  const year = parsedDate.getFullYear();

  if (year <= minYear) {
    return false;
  }

  if (year >= maxYear) {
    return false;
  }

  return true;
};

export const validateRG = (rg: string) => {
  if (!rg) {
    return false;
  }

  if (!/^[A-Za-z0-9]+$/.test(rg)) {
    return false;
  }

  if (/^(\d)\1{4,19}$/.test(rg)) {
    return false;
  }

  return true;
};

export const validateCpf = (fullCpf: string) => {
  const cpf = fullCpf.replace(/[^\d]+/g, '');
  let sum: number;
  let rest: number;
  sum = 0;

  if (/^(\d)\1{10}$/.test(cpf) || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }
  return true;
};

export const validateCnpj = (cnpj: string) => {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj === '') {
    return false;
  }

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return false;
  }

  let size = cnpj.length - 2;
  let number = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(number.charAt(size - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let result: number = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0), 10)) {
    return false;
  }

  size += 1;
  number = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(number.charAt(size - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1), 10)) {
    return false;
  }

  return true;
};

export const validateCpfOrCnpj = (value: string) => {
  const isValidCpf = validateCpf(value);
  const isValidCnpj = validateCnpj(value);

  if (isValidCpf || isValidCnpj) {
    return true;
  }
  return false;
};

export const validateZipCode = async (zipCode: string) => {
  try {
    const response = await zipCodeService.getAddress(zipCode);

    if (!response) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

export const validatePhone = (phone?: string) => {
  if (!phone) {
    return false;
  }

  phone = phone.replace(/\D/g, '');
  if (phone.length < 10 || phone.length > 11) {
    return false;
  }

  const ddd = phone.substring(0, 2);
  if (ddd < '11' || ddd > '99') {
    return false;
  }

  const repeatedDigits = phone.split('').every(digit => digit === phone[0]);
  if (repeatedDigits) {
    return false;
  }

  if (phone.length === 11) {
    return phone[2] === '9';
  }

  return true;
};

export const validateLettersSpaces = (text?: string, acceptHyphen = false) => {
  if (!text) {
    return true;
  }

  const regex = acceptHyphen ? /^[A-Za-zÀ-ú\s-]+$/ : /^[A-Za-zÀ-ú\s]+$/;
  return regex.test(text);
};

export const validateUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9._]+$/;
  return regex.test(username);
};
