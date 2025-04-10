// src/encryption.ts
import * as crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const ivLength = 16;

function getKey(secret: string): Buffer {
    return crypto.createHash('sha256').update(secret).digest();
}

function extractIVAndCipher(encryptedData: string): { iv: Buffer; cipherText: string } {
    const [ivHex, cipherText] = encryptedData.split(':');
    if (!ivHex || !cipherText) throw new Error("Invalid encrypted data format");
    return {
        iv: Buffer.from(ivHex, 'hex'),
        cipherText
    };
}

function aesDecrypt(cipherText: string, encryptionKey: string, iv: Buffer): string {
    const key = getKey(encryptionKey);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function encryptData(plainText: string, secret: string): string {
    const iv = crypto.randomBytes(ivLength);
    const key = getKey(secret);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + ':' + encrypted;
}

export function decryptData(encryptedData: string, secret: string): string {
    const { iv, cipherText } = extractIVAndCipher(encryptedData);
    return aesDecrypt(cipherText, secret, iv);
}
