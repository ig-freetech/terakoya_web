const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;

const API_GATEWAY_ID =
  process.env.NODE_ENV == "development"
    ? process.env.AWS_DEV_GATEWAY_ID
    : process.env.AWS_PROD_GATEWAY_ID;

export const API_BASE_URL = `https://${API_GATEWAY_ID}.execute-api.${AWS_DEFAULT_REGION}.amazonaws.com`;
