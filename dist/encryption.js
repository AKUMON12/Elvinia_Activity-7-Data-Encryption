"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptData = encryptData;
exports.decryptData = decryptData;
// src/encryption.ts
const crypto = __importStar(require("crypto"));
const algorithm = 'aes-256-cbc';
const ivLength = 16;
function getKey(secret) {
    return crypto.createHash('sha256').update(secret).digest();
}
function extractIVAndCipher(encryptedData) {
    const [ivHex, cipherText] = encryptedData.split(':');
    if (!ivHex || !cipherText)
        throw new Error("Invalid encrypted data format");
    return {
        iv: Buffer.from(ivHex, 'hex'),
        cipherText
    };
}
function aesDecrypt(cipherText, encryptionKey, iv) {
    const key = getKey(encryptionKey);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
function encryptData(plainText, secret) {
    const iv = crypto.randomBytes(ivLength);
    const key = getKey(secret);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}
function decryptData(encryptedData, secret) {
    const { iv, cipherText } = extractIVAndCipher(encryptedData);
    return aesDecrypt(cipherText, secret, iv);
}
