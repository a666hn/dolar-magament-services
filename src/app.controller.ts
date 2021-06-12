import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    getInit(): string {
        return 'Hello NestJS';
    }
}