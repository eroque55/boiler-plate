// eslint-disable-next-line no-restricted-imports
import z from 'zod';

const pt = z.locales.pt();

z.config({
  ...pt,
  customError: issue => {
    if (!issue.input) {
      return 'Campo obrigatório';
    }

    if (issue.code === 'too_small') {
      if (issue.minimum === 1) {
        return 'Campo obrigatório';
      }
      return `Mínimo de ${issue.minimum} caracteres`;
    }

    if (issue.code === 'too_big') {
      return `Máximo de ${issue.maximum} caracteres`;
    }

    if (issue.format === 'email' && issue.code === 'invalid_format') {
      return 'E-mail inválido';
    }

    return 'Campo inválido';
  },
});

export default z;
