// src/index.ts
import { encryptData, decryptData } from './encryption';

const secretKey = 'super-secret-key';
const message = 'This is confidential.';

const encrypted = encryptData(message, secretKey);
const decrypted = decryptData(encrypted, secretKey);

console.log('🔐 Original:', message);
console.log('🔒 Encrypted:', encrypted);
console.log('🔓 Decrypted:', decrypted);
