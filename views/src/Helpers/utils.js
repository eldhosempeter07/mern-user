export function checkIfValidEmail(str) {
  // Regular expression to check if string is a valid email
  const EMAIL_REGEX = /^[^@]+@\w+(\.\w+)+\w$/;

  return EMAIL_REGEX.test(str);
}
