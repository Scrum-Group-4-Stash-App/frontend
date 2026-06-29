export const MIN_PASSWORD_LENGTH = 8;

export function getPasswordLengthError(password: string) {
  if (password.length >= MIN_PASSWORD_LENGTH) {
    return null;
  }

  const remaining = MIN_PASSWORD_LENGTH - password.length;

  return `Password must be at least ${MIN_PASSWORD_LENGTH} characters. Add ${remaining} more ${
    remaining === 1 ? "character" : "characters"
  }.`;
}
