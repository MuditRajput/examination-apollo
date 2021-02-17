import dotenv from 'dotenv';

const envVars = dotenv.config().parsed;
const config = {
  port: envVars.port,
  nodeEnv: envVars.node_env,
  serviceUrl: envVars.service_url,
};

export default config;
