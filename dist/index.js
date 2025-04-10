"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const encryption_1 = require("./encryption");
const secretKey = 'super-secret-key';
const message = 'This is confidential.';
const encrypted = (0, encryption_1.encryptData)(message, secretKey);
const decrypted = (0, encryption_1.decryptData)(encrypted, secretKey);
console.log('🔐 Original:', message);
console.log('🔒 Encrypted:', encrypted);
console.log('🔓 Decrypted:', decrypted);
