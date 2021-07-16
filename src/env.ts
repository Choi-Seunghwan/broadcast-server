const env = process.env.NODE_ENV;
const config = require(`./${env}.config.json`);

export const JWT = config.jwt;
