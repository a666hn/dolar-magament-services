import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const CreatePassword = async(password: string): Promise<string> => {
    
    if (!password) {
        throw new BadRequestException('Please provide the password!');
    }

    const SALT = await bcrypt.genSalt();
    let pass: string = ""
    pass = await bcrypt.hash(password, SALT);

    return pass;
}