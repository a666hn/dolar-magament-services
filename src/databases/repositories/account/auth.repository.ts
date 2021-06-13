import { UsersEntity } from "src/databases/entities/users.entity";
import { UserRegistrationDto } from "src/interfaces/dto/account/users.dto";
import { CreatePassword } from "src/utils/util";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@EntityRepository(UsersEntity)
export class AuthRepository extends Repository<UsersEntity> {
    async userRegistration(uDto: UserRegistrationDto): Promise<UsersEntity> {
        const { name, email, password } = uDto;
        const p = await CreatePassword(password);
        const user = this.create({ name, email, password: p });

        try {
            await this.save(user);

            return user;
        } catch (err) {
            console.log("Error:", err.code)
        }
    }

    async UserSignIn(user: UsersEntity, password: string): Promise<[boolean, UsersEntity]> {
        const isMatch = await bcrypt.compare(password, user.password);

        return [isMatch, user];
    }
}