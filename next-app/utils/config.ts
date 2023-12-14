export const IS_DEV = process.env.STAGE === "development";
export const IS_PROD = process.env.STAGE === "production";

const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION;

const API_GATEWAY_ID = IS_DEV
  ? process.env.AWS_DEV_GATEWAY_ID
  : process.env.AWS_PROD_GATEWAY_ID;

export const API_BASE_URL = `https://${API_GATEWAY_ID}.execute-api.${AWS_DEFAULT_REGION}.amazonaws.com`;
// export const API_BASE_URL = `http://localhost:8000`;

export const S3_BUCKET_NAME = IS_DEV;
