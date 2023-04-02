const API_GATEWAY_ID =
  process.env.NODE_ENV == "development"
    ? process.env.AWS_DEV_GATEWAY_ID
    : process.env.AWS_PROD_GATEWAY_ID;

const API_GATEWAY_REGION = process.env.AWS_GATEWAY_REGION;

export const BASE_URL = `https://${API_GATEWAY_ID}.execute-api.${API_GATEWAY_REGION}.amazonaws.com/v1`;
