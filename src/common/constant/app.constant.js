export const DATABASE_URL = process.env.DATABASE_URL;
// ACCESS TOKEN
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPRIED = process.env.ACCESS_TOKEN_EXPRIED;
// REFRESH TOKEN
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPRIED = process.env.REFRESH_TOKEN_EXPRIED;

export const REGEX_EMAIL =
  /(?=^[a-z0-9.]+@[a-z0-9.-]+\.[a-zA-Z]{2,6}$)(?=^.{1,40}$)/i;
console.log({
  DATABASE_URL,
  ACCESS_TOKEN_EXPRIED,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPRIED,
});
