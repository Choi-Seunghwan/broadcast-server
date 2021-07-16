const env = process.env.NODE_ENV;
const config = require(`./${env}.config.json`);

export const JWT_KEY = config.jwtKey;
export const TOKEN_OPTIONS = config.tokenOptions;
