import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/databases/repositories/account/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class UserHandler {}
