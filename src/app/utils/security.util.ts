import jwt from 'jsonwebtoken';
import {AES, enc} from 'crypto-ts';
import { CONFIG } from '../config';

export const createToken = (data: any): string => {
    return encryptString(jwt.sign(data, CONFIG.env.jwt_secret ?? ''));
}

export const validateToken = (token: string): any => {
    return jwt.verify(decryptiString(token), CONFIG.env.jwt_secret ?? '');
}

export const encryptString = (data: string): string => {
    return AES.encrypt(data, CONFIG.env.encryption_secret).toString();
}

export const decryptiString = (encData: string): string => {
    return AES.decrypt(encData, CONFIG.env.encryption_secret).toString(enc.Utf8);
}
