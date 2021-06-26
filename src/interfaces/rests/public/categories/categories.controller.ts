import { Controller } from '@nestjs/common';
import {
    CATEGORIES_URL,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';

@Controller(`/${VERSION_1}/${CATEGORIES_URL}`)
export class CategoriesController {}
