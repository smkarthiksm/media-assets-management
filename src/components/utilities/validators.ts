export const textValidation = (input: string) => {
  return /^[A-Za-z]+$/.test(input);
};

export const emailValidation = (input: string) => {
  return /\S+@\S+\.\S+/.test(input);
};
