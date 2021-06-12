import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_KEY: string = process.env.JWT_KEY || 'super secret';