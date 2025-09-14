import * as z from 'zod/v3';

const customErrorMap: z.ZodErrorMap = issue => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'string') {
      return { message: 'Campo obrigatório' };
    }
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    if (issue.minimum === 1) {
      return { message: 'Campo obrigatório' };
    }

    return { message: `Mínimo de ${issue.minimum} caracteres` };
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    return { message: `Máximo de ${issue.maximum} caracteres` };
  }

  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === 'email') {
      return { message: 'Email Inválido' };
    }
  }

  return { message: 'Campo inválido' };
};

z.setErrorMap(customErrorMap);

export default z;
