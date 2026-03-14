export const info = (...args: unknown[]): void => {
  // prepend ISO timestamp for basic structured logs
  // Replace with a proper logger (pino/winston) in production
  // eslint-disable-next-line no-console
  console.log(new Date().toISOString(), 'INFO', ...args);
};

export const error = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console
  console.error(new Date().toISOString(), 'ERROR', ...args);
};

export default { info, error };
