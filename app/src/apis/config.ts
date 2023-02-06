const API_GATEWAY_ID = process.env.AWS_GATEWAY_ID;
const API_GATEWAY_REGION = process.env.AWS_GATEWAY_REGION;

export const BASE_URL = `https://${API_GATEWAY_ID}.execute-api.${API_GATEWAY_REGION}.amazonaws.com/v1`;
