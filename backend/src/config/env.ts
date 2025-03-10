import 'dotenv/config';

export const {
  ENV,
  PORT,
  CORS_WHITELIST,
  TYPEORM_PORT,
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  API_KEY,
  JWT_SECRET,
} = process.env;

const requiredEnv = {
  ENV,
  PORT,
  TYPEORM_PORT,
  TYPEORM_HOST,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  API_KEY,
  JWT_SECRET,
};

for (const [key, value] of Object.entries(requiredEnv)) {
  if (!value) {
    console.error(`Error: Environment variable ${key} is not defined.`);
    process.exit(1);
  }
}
