import { Exclude } from 'class-transformer';
import { EUsersStatus } from 'src/globals/enum.global';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Name } from './embeded/name.embeded';
import { UsersProfileEntity } from './users_profile.entity';

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column(() => Name)
    name: Name;

    @Column({ unique: true, nullable: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        enum: EUsersStatus,
        default: EUsersStatus.REGISTERED,
    })
    status: EUsersStatus;

    @Column({ default: false })
    isEmailVerified: boolean;

    @OneToOne(() => UsersProfileEntity, { nullable: true })
    @JoinColumn()
    profile: UsersProfileEntity;

    @Column()
    createdAt: Date;

    @Column({ nullable: true })
    updatedAt: Date;

    @Column({ nullable: true })
    createdBy: string;

    @Column({ nullable: true })
    updatedBy: string;

    @Column({ default: 0 })
    version: number;

    @BeforeInsert()
    updateInsertedData() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updateUpdatedData() {
        this.updatedAt = new Date();
        this.version++;
    }
}
