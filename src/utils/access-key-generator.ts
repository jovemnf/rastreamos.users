import { generateApiKey } from "generate-api-key";

export const accessKeyGenerator = () => generateApiKey({ method: 'base32', prefix: 'access_key' });
