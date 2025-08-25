export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "desarrollo",
  jwtSecret: process.env.JWT_SECRET || "changeme",
};