export const ERROR_MESSAGES = {
  'method-not-found': "We can't found the method provided.",
  'user-not-found': "We cant't found any user with provided credentials.",
  'not-found': "We cant't found any data.",
  'internal-error': 'Ops... Error in our systems, Come back later.',
  'missing-field': 'All necessary data are not provided.',
};

export function handleError(type: keyof typeof ERROR_MESSAGES) {
  return { type, message: ERROR_MESSAGES[type] };
}
