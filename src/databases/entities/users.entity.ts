import { Exclude } from 'class-transformer';
import { ACCOUNT_STATUS } from 'src/globals/global.enum';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersProfileEntity } from './users_profile.entity';
import { USERS_ENTITY } from 'src/globals/dictionary/entity.dictionary';
import * as bcrypt from 'bcrypt';

@Entity(USERS_ENTITY)
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: false,
        name: 'first_name',
    })
    firstName: string;

    @Column({
        name: 'last_name',
    })
    lastName: string;

    @Column({
        unique: true,
        nullable: true,
    })
    username: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({
        name: 'phone_number',
        nullable: true,
    })
    phoneNumber: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        enum: ACCOUNT_STATUS,
        enumName: 'account_status_enum',
        default: ACCOUNT_STATUS.REGISTERED,
    })
    status: ACCOUNT_STATUS;

    @Column({
        name: 'is_email_verified',
        default: false,
    })
    isEmailVerified: boolean;

    @OneToOne(() => UsersProfileEntity, {
        nullable: true,
        createForeignKeyConstraints: true,
    })
    @JoinColumn({
        name: 'profile_id',
    })
    profile: UsersProfileEntity;

    @Column({
        name: 'created_at',
    })
    createdAt: Date;

    @Column({
        name: 'updated_at',
        nullable: true,
    })
    updatedAt: Date;

    @Column({
        name: 'created_by',
        nullable: true,
    })
    createdBy: string;

    @Column({
        name: 'updated_by',
        nullable: true,
    })
    updatedBy: string;

    @Column({
        default: 0,
    })
    version: number;

    @BeforeInsert()
    async updateInsertedData(password: string) {
        this.createdAt = new Date();

        const SALT = await bcrypt.genSalt();

        this.password = await bcrypt.hash(password || this.password, SALT);
    }

    @BeforeUpdate()
    updateUpdatedData() {
        this.updatedAt = new Date();
        this.version++;
    }
}
