import {
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PostgressCodeError } from 'src/globals/global.enum';

export const HandlePostgressError = (
    code: PostgressCodeError,
    message: string,
) => {
    switch (code) {
        case PostgressCodeError.DEAD_LOCK_DETECTED:
            throw new InternalServerErrorException(message);
        case PostgressCodeError.FOREIGN_KEY_VIOLATION:
        case PostgressCodeError.NOT_NULL_VIOLATION:
        case PostgressCodeError.NULL_VALUE_NOT_ALLOWED:
        case PostgressCodeError.UNIQUE_VIOLATION:
            throw new BadRequestException(message);
        default:
            console.log(code, message);
            throw new InternalServerErrorException(message);
    }
};
