import dotenv from 'dotenv';
const result = dotenv.config({
  path: '.env',
});

export default {
  // EXPRESS (SERVER INFO)
  SERVER_PORT: result.parsed?.SERVER_PORT,

  // MONGODB (DATABASE INFO)
  DATABASE_NAME: result.parsed?.DATABASE_NAME,
  DATABASE_USER: result.parsed?.DATABASE_USER,
  DATABASE_PASSWORD: result.parsed?.DATABASE_PASSWORD,
  DATABASE_HOST: result.parsed?.DATABASE_HOST,

  // JSON WEB TOKEN
  JWT_PRIVATE_KEY: result.parsed?.JWT_PRIVATE_KEY,

  // CLIENTS
  PLATFORM_URL: result.parsed?.PLATFORM_URL,

  // ADMIN
  LOGIN: result.parsed?.LOGIN,
  PASSWORD: result.parsed?.PASSWORD,
};