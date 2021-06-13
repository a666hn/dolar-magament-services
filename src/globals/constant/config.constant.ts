import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'super secret';