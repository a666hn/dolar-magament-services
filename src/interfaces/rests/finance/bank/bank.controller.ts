import { Controller } from '@nestjs/common';
import { BANK_URL, VERSION_1 } from 'src/dictionaries/constant.dictionary';

@Controller(`/${VERSION_1}/${BANK_URL}`)
export class BankController {}
