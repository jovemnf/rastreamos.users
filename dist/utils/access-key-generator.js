"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessKeyGenerator = void 0;
const generate_api_key_1 = require("generate-api-key");
const accessKeyGenerator = () => (0, generate_api_key_1.generateApiKey)({ method: 'base32', prefix: 'access_key' });
exports.accessKeyGenerator = accessKeyGenerator;
