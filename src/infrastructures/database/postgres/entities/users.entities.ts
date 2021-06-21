import { USER_ENTITY } from 'src/dictionaries/constant.dictionary';
import { ACCOUNT_STATUS } from 'src/globals/global.enum';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import * as bcrypt from 'bcrypt';
import { UserProfiles } from './user_profiles.entity';

@Entity(USER_ENTITY)
export class UsersEntity extends BaseEntity {
    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        unique: true,
        nullable: true,
    })
    username: string;

    @Column({
        nullable: false,
    })
    password: string;

    @Column({
        nullable: false,
        enum: ACCOUNT_STATUS,
        default: ACCOUNT_STATUS.REGISTERED,
        enumName: 'account_status_enum',
        name: 'account_status',
    })
    status: string;

    @Column({
        nullable: true,
        name: 'profile_id'
    })
    profileId: string;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    deletedAt: Date;

    @Column({
        type: 'int4',
        default: 0,
    })
    versions: number;

    @OneToOne(() => UserProfiles, {
        nullable: true,
    })
    @JoinColumn({
        name: 'profile_id',
        referencedColumnName: 'id',
    })
    profile: UserProfiles;

    @BeforeInsert()
    async updatePassword() {
        const SALT = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, SALT);
    }

    @BeforeUpdate()
    updatedVersionRow() {
        this.versions += 1;
    }
}
