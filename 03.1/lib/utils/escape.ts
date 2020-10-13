export const escapePassword = (obj: { password?: string }): { password?: string } => {
  if (!obj || !obj.password) {
    return obj;
  }

  return {
    ...obj,
    password: obj.password.replace(/./g, '*'),
  };
};
